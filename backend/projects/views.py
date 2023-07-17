from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated

from users.serializers import Skill
from .serializers import ProjectSerializer, Required_SkillSerializer
from .models import Project


class ProjectRecentAPIView(generics.ListAPIView):
    """
    List recent projects
    Can be accessed by any one in the main page
    """

    serializer_class = ProjectSerializer
    authentication_class = []
    permission_classes = []

    def get_queryset(self):
        queryset = Project.objects.all().order_by("-id")[:6]
        return queryset


class ProjectListAPIView(generics.ListAPIView):
    """
    List all projects
    Can be accessed by only logged-in users
    """

    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]


class ProjectCreateAPIView(generics.CreateAPIView):
    """
    Create a new project
    Can be accessed by a client
    """

    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            skills = None
            try:
                skills = request.data.get("skills")
            except:
                skills = None
            if skills:
                for skill in skills:
                    skill_id = int(skill["skill_id"])
                    try:
                        skill_obj = Skill.objects.get(skill_id=skill_id)
                    except:
                        raise Exception("skill_id is not valid")

            self.perform_create(serializer)

            if skills:
                project_id = serializer.data.get("id")
                data = [
                    {"project": project_id, "skill": skill.get("skill_id")}
                    for skill in skills
                ]
                skillserializer = Required_SkillSerializer(data=data, many=True)
                skillserializer.is_valid(raise_exception=True)
                skillserializer.save()

            return Response(
                {"project_id": serializer.data["id"]}, status=status.HTTP_201_CREATED
            )

        except Exception as e:
            e = str(e)
            return Response({"error-details": e}, status=status.HTTP_400_BAD_REQUEST)


class ProjectDetailAPIView(generics.RetrieveAPIView):
    """
    Retrieve a single project
    Can be accessed by anyone
    """

    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]


class ProjectUpdateAPIView(generics.UpdateAPIView):
    """
    Update a single project
    Can be accessed by a client
    """

    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = "pk"


class ProjectDestroyAPIView(generics.DestroyAPIView):
    """
    Destroy a single project
    Can be accessed by a client
    """

    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = "pk"

    def perform_delete(self, instance):
        super().perform_destroy(instance)
