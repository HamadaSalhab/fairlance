from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet
from rest_framework import generics

from transactions.models import Payment
from users.models import User
from .models import Application, Employment
from projects.models import Project
from .serializers import ApplicationSerializer, EmploymentSerializer


class ApplicationRetrieveView(generics.RetrieveAPIView):
    permissions_classes = []
    authentication_classes = []
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer


class ApplicationListView(generics.ListAPIView):
    permissions_classes = []
    authentication_classes = []
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

    def get(self, request, project_id):
        project = Project.get(project_id)
        applications = Application.objects.filter(project=project)


class ApplicationDestroyView(generics.DestroyAPIView):
    permissions_classes = []
    authentication_classes = []
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer


class ApplicationUpdateView(generics.UpdateAPIView):
    permissions_classes = [permissions.IsAuthenticated]
    authentication_classes = []
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer


class ApplicationCreateView(generics.CreateAPIView):
    permissions_classes = [permissions.IsAuthenticated]
    authentication_classes = []
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

    def create(self, request):
        """
        Create a new application for given project and freelancer
        :param request:
        :return:
        """
        project = Project.objects.get(project_id=request.data['project'])
        if not project:
            return Response(status=status.HTTP_404_NOT_FOUND)
        freelancer = User.objects.get(id=request.data['freelancer'])
        if not freelancer:
            return Response(status=status.HTTP_404_NOT_FOUND)
        application = Application(project=project, freelancer=freelancer)
        serializer = ApplicationSerializer(application, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class EmploymentRetrieveView(generics.RetrieveAPIView):
    permissions_classes = []
    authentication_classes = []
    queryset = Employment.objects.all()
    serializer_class = ApplicationSerializer

class EmploymentCreateView(generics.CreateAPIView):
    permissions_classes = [permissions.IsAuthenticated]
    authentication_classes = []
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

    def create(self, request):
        """
        Create a new employment for given application and a payment
        :param request:
        :return:
        """
        application = Application.objects.get(id=request.data['application'])
        if not application:
            return Response(status=status.HTTP_404_NOT_FOUND)
        payment = Payment.objects.get(id=request.data['payment'])
        if not payment:
            return Response(status=status.HTTP_404_NOT_FOUND)
        employment = Employment(application=application, payment=payment)
        serializer = EmploymentSerializer(employment, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class EmploymentUpdateView(generics.UpdateAPIView):
    permissions_classes = [permissions.IsAuthenticated]
    authentication_classes = []
    queryset = Employment.objects.all()
    serializer_class = ApplicationSerializer

class EmploymentDestroyView(generics.DestroyAPIView):
    permissions_classes = [permissions.IsAuthenticated]
    authentication_classes = []
    queryset = Employment.objects.all()
    serializer_class = ApplicationSerializer