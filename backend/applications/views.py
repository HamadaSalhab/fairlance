import datetime

from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework import generics

from transactions.models import Payment
from .models import Application, Employment
from projects.models import Project
from .serializers import ApplicationSerializer, EmploymentSerializer


class ApplicationRetrieveView(generics.RetrieveAPIView):
    """
    Retrieve a single application
    Can be accessed by a freelancer and a client
    """
    permissions_classes = []
    authentication_classes = []
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer


class ApplicationListView(generics.ListAPIView):
    """
    List all applications for a given project
    Can be accessed by a client
    """
    permissions_classes = []
    authentication_classes = []
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    lookup_field = 'project_id'

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

    def create(self, request, **kwargs):
        """
        Create a new application for given project and freelancer
        :param request:
        :return:
        """
        print(request.data['project'])
        project = Project.objects.get(id=request.data['project'])
        print(project)
        if not project:
            return Response(status=status.HTTP_404_NOT_FOUND)
        freelancer = request.user
        if not freelancer:
            return Response(status=status.HTTP_404_NOT_FOUND)
        application = Application(project=project, freelancer=freelancer)
        serializer_data = dict()
        serializer_data['project'] = request.data['project']
        serializer_data['freelancer'] = freelancer.id
        serializer_data['bid'] = request.data['bid']
        serializer_data['proposal'] = request.data['proposal']
        try:
            serializer = ApplicationSerializer(application, data=serializer_data)
        except Exception as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


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
    authentication_classes = [TokenAuthentication]
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

    def create(self, request, **kwargs):
        """
        Create a new employment for given application and a payment
        :param request:
        :return:
        """
        application = Application.objects.get(id=request.data['application'])
        if not application:
            return Response(status=status.HTTP_404_NOT_FOUND)
        # check if the user is an owner of the project
        if request.user != application.project.owner:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        # create a payment
        payment = Payment(payer_id=request.user.id, payee_id=application.freelancer.id, amount=application.bid, date=datetime.datetime.now())
        payment.save()
        if not payment:
            return Response(status=status.HTTP_404_NOT_FOUND)
        employment = Employment(application=application, payment=payment)
        serializer_data = dict()
        serializer_data['application'] = request.data['application']
        serializer_data['payment'] = payment.id
        serializer = EmploymentSerializer(employment, data=serializer_data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


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
