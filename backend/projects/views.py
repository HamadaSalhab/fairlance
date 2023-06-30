from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from .serializers import ProjectSerializer, ProjectOwnerSerializer
from .models import Project
from users.serializers import UserSerializer

class ProjectListAPIView(generics.ListAPIView):
    """
    List all projects
    Can be accessed by only logged-in users
    """

    """
    SELECT * from projects_project;
    """
    queryset = Project.objects.raw("select * from auth_user right join projects_project on auth_user.id = projects_project.owner_id")
    serializer_class = ProjectOwnerSerializer
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]

    

class ProjectCreateAPIView(generics.CreateAPIView):
    """
    Create a new project
    Can be accessed by a client
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            response_data = {
                'project_details': serializer.data,
                'owner': {
                    'first_name': request.user.first_name,
                    'last_name': request.user.last_name
                }
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        
        except ValidationError as e:
            errors = e.detail
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)


class ProjectDetailAPIView(generics.RetrieveAPIView):
    """
    Retrieve a single project
    Can be accessed by anyone
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        user = User.objects.get(id=serializer.data['owner'])
        response_data = {
            'project_details': serializer.data,
            'owner': {
                'first_name': user.first_name,
                'last_name': user.last_name
            }
        }
        return Response(response_data)

class ProjectUpdateAPIView(generics.UpdateAPIView):
    """
    Update a single project
    Can be accessed by a client
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = 'pk'


class ProjectDestroyAPIView(generics.DestroyAPIView):
    """
    Destroy a single project
    Can be accessed by a client
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = 'pk'

    def perform_delete(self, instance):
        super().perform_destroy(instance)
