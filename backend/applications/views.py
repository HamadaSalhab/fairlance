from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from transactions.models import Payment
from users.models import User
from .models import Application, Employment
from projects.models import Project
from .serializers import ApplicationSerializer, EmploymentSerializer


class ApplicationApiView(APIView):
    permissions_classes = [permissions.IsAuthenticated]

    def get_project(self, project_id):
        try:
            return Project.objects.get(project_id=project_id)
        except Project.DoesNotExist:
            return None

    def get(self, request):
        """
        List all the applications
        :param project_id:
        :param request:
        :return:
        """
        applications = Application.objects.all()
        serializer = ApplicationSerializer(applications, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        """
        Update the application
        :param request:
        :return:
        """
        project = self.get_project(request.data['project'])
        if not project:
            return Response(status=status.HTTP_404_NOT_FOUND)
        freelancer = User.objects.get(id=request.data['freelancer'])
        if not freelancer:
            return Response(status=status.HTTP_404_NOT_FOUND)
        application = Application.objects.get(project=project, freelancer=freelancer)
        if not application:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ApplicationSerializer(application, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
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


class ApplicationDetailApiView(APIView):
    def get(self, request, application_id=None):
        """
        Get the application specified by id
        :param request:
        :param id:
        :return:
        """
        application = Application.objects.get(id=application_id)
        if not application:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ApplicationSerializer(application, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, application_id=None):
        """
        Delete the application
        :param application_id:
        :param request:
        :return:
        """
        application = Application.objects.get(id=application_id)
        if not application:
            return Response(status=status.HTTP_404_NOT_FOUND)
        application.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class EmploymentApiView(APIView):
    def get(self, request):
        """
        List all the employments
        :param request:
        :return:
        """
        employments = Employment.objects.all()
        serializer = EmploymentSerializer(employments, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
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

    def put(self, request):
        """
        Update the employment
        :param request:
        :return:
        """
        application = Application.objects.get(id=request.data['application'])
        if not application:
            return Response(status=status.HTTP_404_NOT_FOUND)
        payment = Payment.objects.get(id=request.data['payment'])
        if not payment:
            return Response(status=status.HTTP_404_NOT_FOUND)
        employment = Employment.objects.get(application=application, payment=payment)
        if not employment:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = EmploymentSerializer(employment, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class EmploymentDetailApiView(APIView):
    def get(self, request, employment_id=None):
        """
        Get the employment specified by id
        :param request:
        :param id:
        :return:
        """
        employment = Employment.objects.get(id=employment_id)
        if not employment:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = EmploymentSerializer(employment, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, employment_id=None):
        """
        Delete the employment
        :param employment_id:
        :param request:
        :return:
        """
        employment = Employment.objects.get(id=employment_id)
        if not employment:
            return Response(status=status.HTTP_404_NOT_FOUND)
        employment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
