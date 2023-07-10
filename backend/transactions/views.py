from rest_framework import generics, status
from rest_framework.response import Response

from transactions.models import Transaction
from transactions.serializers import TransactionSerializer
from users.models import Wallet
from users.serializers import WalletSerializer
from .web import get_transaction
from django.core.exceptions import ObjectDoesNotExist

# Create your views here.


class TransactionDepositView(generics.UpdateAPIView):
    permission_classes = []
    authentication_classes = []
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer

    def update(self, request, **kwargs):
        try:
            transaction = Transaction.objects.get(transaction_hash=request.data['transaction'])
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        details = get_transaction(request.data['transaction'])
        if not details:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        if details[1] != "we":
            pass
            # return Response(status=status.HTTP_400_BAD_REQUEST)
        wallet = Wallet.objects.get(user=request.user)
        wallet.balance += details[-1]
        wallet.save()
        transaction = Transaction(request.data['transaction'])
        serializer = TransactionSerializer(transaction)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


# WithdrawMoneyView that checks the user has money and release the money by web3.py

class TransactionWithdrawView(generics.UpdateAPIView):
    permission_classes = []
    authentication_classes = []
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer

    def update(self, request, **kwargs):
        wallet = Wallet.objects.get(user=request.user)
        if wallet.balance < request.data['value']:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        # release the money by smartcontract/web3.py
        wallet.balance -= request.data['value']
        serializer = WalletSerializer(wallet)
        serializer.update()
        return Response(serializer.data, status=status.HTTP_200_OK)
