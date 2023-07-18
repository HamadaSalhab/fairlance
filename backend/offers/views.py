import datetime

from rest_framework import generics, status, permissions
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from applications.models import Application
from .models import Offer
from offers.serializers import OfferSerializer

from projects.models import Project_Submission

class OfferAcceptAPIView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]

    def post(self, request, *args, **kwargs):
        try:
            application_id = request.data.get("application_id")
            application = Application.objects.get(id=application_id)
        except:
            return Response({"details": "invalid application"}, status=status.HTTP_400_BAD_REQUEST)
        
        project_submission = application.project.project_submission

        if project_submission.freelancer is not None:
            return Response({"details": "This project is in progress stage"}, status=status.HTTP_400_BAD_REQUEST)
        
        if request.user.id == application.project.owner.id:
            return Response({"details": "you can't work in your process"}, status=status.HTTP_400_BAD_REQUEST)
        
        application.project.status = 'in_progress'
        application.project.save()

        project_submission.freelancer = request.user
        project_submission.bid = application.bid
        project_submission.save()
        Offer.objects.filter(application=application).delete()
        return Response({"details": "You have been hired for this project. Start Working!"}, status=status.HTTP_200_OK)
    
        
         
class OfferCreateView(generics.CreateAPIView):
    """
    Create a new offer for given application
    Can be accessed by a client
    """
    permissions_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer
    
    def create(self, request, *args, **kwargs):
        print(request.data)
        try: 
            return super().create(request, *args, **kwargs)
        except Exception as e:
            return Response({"details":"something went wrong"}, status=status.HTTP_400_BAD_REQUEST)
            



# class OfferDestroyView(generics.DestroyAPIView):
#     """
#     Destroy a single offer
#     Can be accessed by a freelancer
#     """
#     permissions_classes = [permissions.IsAuthenticated]
#     authentication_classes = [TokenAuthentication, SessionAuthentication]
#     queryset = Offer.objects.all()
#     serializer_class = OfferSerializer

#     def destroy(self, request, *args, **kwargs):
#         """
#         Destroy a single offer
#         Can be accessed by a freelancer and a client
#         """
#         offer = Offer.objects.get(id=kwargs['pk'])
#         if offer.application.freelancer != request.user and offer.application.project.owner:
#             return Response(status=status.HTTP_401_UNAUTHORIZED)
#         offer.application.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)


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
