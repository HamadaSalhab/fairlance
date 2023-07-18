from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from django.contrib.auth.hashers import make_password

from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.views import ObtainAuthToken

from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from .models import Skill, UserExtra

import decimal
from .serializers import (
    UserSerializer,
    SkillSerializer,
    UserUpdateSerializer,
    UserExtraSerializer,
)
from rest_framework.parsers import MultiPartParser, FormParser


class UserCreateAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = []
    permission_classes = []
    def perform_create(self, serializer):
        password = serializer.validated_data["password"]
        serializer.save(password=make_password(password))


class UserDetailAPIView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = "pk"
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]


from . import transac
from django.conf import settings


class UserBalanceAPIView(generics.RetrieveAPIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            instance = UserExtra.objects.get(user=request.user)
        except:
            return Response({"balance": 0.00}, status=status.HTTP_200_OK)

        if instance.transaction_hash is None:
            return Response({"balance": instance.balance}, status=status.HTTP_200_OK)

        ret = transac.get_transaction_details(
            instance.transaction_hash,
            settings.USDT_CONTRACT_ADDRESS,
            settings.USDT_CONTRACT_ABI,
        )
        if ret is None:
            return Response({"balance": instance.balance}, status=status.HTTP_200_OK)

        (sender, receiver, amount, statuss) = ret
        
        instance.transaction_hash = None

        accepted = "OK"
        statuss = str(statuss)
        
        if (
            receiver is not None
            and statuss == '1'
            and sender == instance.wallet_address
            and receiver == settings.CONTRACT_ADDRESS
        ):
            instance.balance = instance.balance + decimal.Decimal(amount)
        else:
            accepted = "Your latest transaction was rejected!"

        instance.save()

        return Response(
            {"balance": instance.balance, "Details": accepted},
            status=status.HTTP_200_OK,
        )

class UserWithdrawAPIView(generics.CreateAPIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        amount = request.data.get('amount')
        if amount is None:
            return Response({"details":"bad request"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            amount = int(amount)
        except:
            return Response({"details":"invalid amount"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            instance = request.user.extradetails
        except:
            return Response({"details":"you don't have sufficient balannce"}, status=status.HTTP_400_BAD_REQUEST)
        
        if amount > instance.balance:
            return Response({"details":"you don't have sufficient balannce"}, status=status.HTTP_400_BAD_REQUEST)
        
        if amount < 1.0:
            return Response({"details":"you can't withdraw less than 1.0 usdt"}, status=status.HTTP_400_BAD_REQUEST)
        
        if instance.wallet_address is None:
            return Response({"details":"please specify your wallet first"}, status=status.HTTP_400_BAD_REQUEST)
        
        tx = transac.send_transaction_to_user(instance.wallet_address, amount*1000000000000000000)
        
        statuss = str(tx['status'])
        
        if statuss == '1':
            instance.balance = instance.balance - amount
            instance.save()
            return Response({"details":"Successfull Withdrawal"}, status=status.HTTP_202_ACCEPTED)
        
        else :
            return Response({"details":"Rejected Withdrawal"}, status=status.HTTP_406_NOT_ACCEPTABLE)
        
        


class UserTransactionRetrieveAPIView(generics.RetrieveAPIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        instance = None
        try:
            instance = UserExtra.objects.get(user=request.user)
        except:
            instance = None

        if instance is None:
            return Response(
                {"details": "wallet address is not specified"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if instance.wallet_address == "not-specified":
            return Response(
                {"details": "wallet address is not specified"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if instance.transaction_hash is not None:
            return Response(
                {"details": "Your transaction is still in progress!"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response({}, status=status.HTTP_200_OK)


class UserTransactionCreateAPIView(generics.CreateAPIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]


class UserUpdateAPIView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer
    lookup_field = "pk"
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]


class UserExtraUpdateAPIView(generics.UpdateAPIView):
    parser_classes = (FormParser, MultiPartParser)
    queryset = UserExtra.objects.all()
    serializer_class = UserExtraSerializer
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    lookup_field = "pk"

    def update(self, request, **kwargs):
        instance = None
        try:
            instance = UserExtra.objects.get(user=request.user)
        except:
            instance = UserExtra.objects.create(user=request.user)

        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)

        return Response(serializer.data)


class SkillListAPIView(generics.ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]


class CustomAuthTokenView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        return Response(
            {
                "token": token.key,
                "id": token.user.id,
                "first_name": token.user.first_name,
                "last_name": token.user.last_name,
            }
        )
