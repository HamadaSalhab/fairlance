from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

from users.serializers import Skill
from .serializers import ProjectSerializer, Required_SkillSerializer, ProjectSubmissionSerializer
from .models import Project, Project_Submission

class ProjectSubmissionUpdateAPIView(generics.UpdateAPIView):
    parser_classes = (FormParser, MultiPartParser)
    queryset = Project_Submission.objects.all()
    serializer_class = ProjectSubmissionSerializer
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    
    def update(self, request, pk=None, **kwargs):
        try:
            project_id = pk
            instance = Project.objects.get(id=project_id)
        except:
            return Response({"details": "invalid project id"}, status=status.HTTP_400_BAD_REQUEST)
        
        if (
            instance.project_submission.freelancer is None or
            (
                instance.project_submission.freelancer is not None 
                and instance.project_submission.freelancer.id != request.user.id
            )
        ):
            return Response({"details": "You are not hired for this project!"}, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(instance.project_submission, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        instance.status = 'delivered'
        instance.save()
        return Response(serializer.data)

from users.models import UserExtra 
class ProjectPayAPIView(generics.CreateAPIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ProjectSerializer

    def post(self, request, pk=None, *args, **kwargs):
        try:
            project_id = pk
            instance = Project.objects.get(id=project_id)
        except:
            return Response({"details": "invalid project id"}, status=status.HTTP_400_BAD_REQUEST)
        
        print(request.user)
        if request.user.id != instance.owner.id:
            return Response({"details": "You are not authorized to pay"}, status=status.HTTP_401_UNAUTHORIZED)
        
        if instance.status != 'delivered':
            return Response({"details": "The project is either not delivered or finished"}, status=status.HTTP_400_BAD_REQUEST)
        
        receiver = instance.project_submission.freelancer
        try:
            details = receiver.extradetails
        except:
            details = UserExtra.create(user=receiver)

        details.balance = details.balance + instance.project_submission.bid
        instance.status = 'finished'
        details.save()

        return Response({"details": f"you successfully paid the amount {instance.project_submission.bid} to the freelancer"}, status=status.HTTP_200_OK)

class ProjectRecentAPIView(generics.ListAPIView):
    """
    List recent projects
    Can be accessed by any one in the main page
    """

    serializer_class = ProjectSerializer
    authentication_classes = []
    permission_classes = []

    def get_queryset(self):
        queryset = Project.objects.all().order_by("-id")[:6]
        return queryset


class ProjectListAPIView(generics.ListAPIView):
    """
    List all projects
    Can be accessed by only logged-in users
    """

    queryset = Project.objects.all().order_by("-id")
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
            try:
                Project_Submission.objects.create(project=Project.objects.get(id=serializer.data.get("id")))
            except Exception as e:
                print(e)

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
