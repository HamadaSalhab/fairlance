from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from offers.models import Offer
from .models import Application, Employment
from projects.models import Project
from .serializers import ApplicationSerializer, EmploymentSerializer
from django.contrib.auth.models import User


class ApplicationRetrieveView(generics.RetrieveAPIView):
    """
    Retrieve a single application
    Can be accessed by a freelancer and a client
    """

    authentication_classes = [TokenAuthentication]
    permissions_classes = [IsAuthenticated]
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    lookup_field = 'pk'


class ApplicationListView(generics.ListAPIView):
    """
    List all applications for a given project
    Can be accessed by a client
    """

    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    lookup_field = "project_id"

    def get(self, request, project_id=None, **kwargs):
        applications = Application.objects.filter(project_id=project_id)
        serializer = ApplicationSerializer(applications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ApplicationDestroyView(generics.DestroyAPIView):
    """
    Destroy a single application
    Can be accessed by a freelancer
    """

    permissions_classes = []
    authentication_classes = []
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer


class ApplicationListFreelancerView(generics.ListAPIView):
    """
    List all applications for a given freelancer
    Can be accessed by a freelancer
    """

    permissions_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    lookup_field = "pk"

    def get(self, request, pk=None, **kwargs):
        # FIXME: Unnecessary check, go to users\urls.py and remove id from url
        if pk != request.user.id:
            return Response({"details": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

        applications = Application.objects.filter(freelancer_id=pk)
        serializer = ApplicationSerializer(applications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ApplicationUpdateView(generics.UpdateAPIView):
    """
    Update a single application
    Can be accessed by a moderator only?
    """

    permissions_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer


class ApplicationCreateView(generics.CreateAPIView):
    """
    Create a new application for given project and freelancer
    Can be accessed by a freelancer
    """

    permissions_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

    def post(self, request, *args, **kwargs):
        # try:

        #     project_id = request.data.get('request_id')
        #     project = Project.objects.get(id=project_id)
        # except:
        #     return Response({"details": "invalid project"}, status=status.HTTP_400_BAD_REQUEST)
            
        # if Application.objects.filter(freelancer=request.user).filter(project=project).exists():
        #     return Response({"details": "You've already applied for this project"}, status=status.HTTP_400_BAD_REQUEST)
        
        return super().create(request, *args, **kwargs)


class EmploymentRetrieveView(generics.RetrieveAPIView):
    """
    Retrieve a single employment
    Can be accessed by a freelancer and a client
    """

    permissions_classes = []
    authentication_classes = []
    queryset = Employment.objects.all()
    serializer_class = ApplicationSerializer


class EmploymentCreateView(generics.CreateAPIView):
    """
    Create a new employment for given application and a payment
    Can be accessed by a client
    """

    permissions_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer


class EmploymentUpdateView(generics.UpdateAPIView):
    """
    Update a single employment
    Can be accessed by a moderator only?
    """

    permissions_classes = [permissions.IsAuthenticated]
    authentication_classes = []
    queryset = Employment.objects.all()
    serializer_class = ApplicationSerializer


class EmploymentDestroyView(generics.DestroyAPIView):
    """
    Destroy a single employment
    Can be accessed by a moderator only?
    """

    permissions_classes = [permissions.IsAuthenticated]
    authentication_classes = []
    queryset = Employment.objects.all()
    serializer_class = ApplicationSerializer
