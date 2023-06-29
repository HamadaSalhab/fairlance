from rest_framework import generics
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .serializers import ProjectSerializer
from .models import Project


class ProjectListAPIView(generics.ListAPIView):
    """
    List all projects
    Can be accessed by anyone
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    authentication_classes = []
    permission_classes = []


class ProjectCreateAPIView(generics.CreateAPIView):
    """
    Create a new project
    Can be accessed by a client
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    authentication_classes = []
    permission_classes = []


class ProjectDetailAPIView(generics.RetrieveAPIView):
    """
    Retrieve a single project
    Can be accessed by anyone
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = 'pk'


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
