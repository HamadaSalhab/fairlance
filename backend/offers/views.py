import datetime

from rest_framework import generics, status, permissions
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from applications.models import Application
from .models import Offer
from offers.serializers import OfferSerializer


# Create your views here.


class OfferCreateView(generics.CreateAPIView):
    """
    Create a new offer for given application
    Can be accessed by a client
    """
    permissions_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer


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
        offer_list = Offer.objects.select_related('application').filter(application__freelancer=request.user)
        serializer = OfferSerializer(offer_list, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
