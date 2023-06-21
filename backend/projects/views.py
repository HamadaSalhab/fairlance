from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Project
from .serializers import ProjectSerializer
import math


class ProjectAPIView(APIView):
    def get(self, request, project_id=None):

        project_count = request.data.get('project_count')
        block_count = request.data.get('block_count')
        if not project_count is None and not block_count is None:
            try:
                project_count = int(project_count)
                block_count = int(block_count)
            except:
                return Response({"details": "invalid parameters"}, status=status.HTTP_400_BAD_REQUEST)

            projects = Project.objects.all()
            count = projects.count()
            left_index = (block_count - 1) * project_count
            right_index = min(left_index + project_count, count)
            serializer = ProjectSerializer(
                projects[left_index:right_index], many=True)
            return Response(serializer.data)

        if not project_id is None:
            try:
                project = Project.objects.get(project_id=project_id)
                serializer = ProjectSerializer(project)
                return Response(serializer.data)
            except Project.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            projects = Project.objects.all()
            serializer = ProjectSerializer(projects, many=True)
            return Response(serializer.data)

    def post(self, request):
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, project_id):
        try:
            project = Project.objects.get(project_id=project_id)
        except Project.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = ProjectSerializer(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, project_id):
        try:
            project = Project.objects.get(project_id=project_id)
        except Project.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
