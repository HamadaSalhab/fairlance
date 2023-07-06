import datetime

from rest_framework import generics, status, permissions
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.response import Response

from applications.models import Application
from .models import Offer
from offers.serializers import OfferSerializer, OfferDetailSerializer


# Create your views here.


class OfferCreateView(generics.CreateAPIView):
    """
    Create a new offer for given application
    Can be accessed by a client
    """
    permissions_classes = []
    authentication_classes = []
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer

    def create(self, request, **kwargs):
        """
        Create a new offer for given application
        Can be accessed by a client
        """
        application = Application.objects.get(id=request.data['application'])
        owner = application.project.owner
        if owner != request.user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        money_value = application.bid
        if money_value < 0:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        if request.user.wallet.balance < money_value:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer_data = dict()
        serializer_data['application'] = request.data['application']
        serializer_data['expiration_time'] = datetime.datetime.now() + datetime.timedelta(days=1)

        serializer = OfferSerializer(data=serializer_data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            request.user.wallet.balance -= money_value
            request.user.wallet.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class OfferDestroyView(generics.DestroyAPIView):
    """
    Destroy a single offer
    Can be accessed by a freelancer
    """
    permissions_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer

    def destroy(self, request, *args, **kwargs):
        """
        Destroy a single offer
        Can be accessed by a freelancer and a client
        """
        offer = Offer.objects.get(id=kwargs['pk'])
        if offer.application.freelancer != request.user and offer.application.project.owner:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        offer.application.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class OfferListView(generics.ListAPIView):
    """
    Retrieve a list of offers
    Can be accessed by a freelancer
    """
    permissions_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer

    def get(self, request, **kwargs):
        """
        Retrieve a list of offers based on the applications that were made by the freelancer
        Can be accessed by a freelancer
        """
        application_list = Application.objects.filter(freelancer=request.user)
        offer_list = []
        for application in application_list:
            offer = Offer.objects.filter(application_id=application.id)
            if offer:
                offer_list.append(offer)
        serializer = OfferDetailSerializer(offer_list, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
