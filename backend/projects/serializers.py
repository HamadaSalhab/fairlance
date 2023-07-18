from rest_framework import serializers
from rest_framework.response import Response
from .models import Project, Required_Skill, Project_Submission

class ProjectSubmissionSerializer(serializers.ModelSerializer):
    submission = serializers.FileField(use_url=True, required=False)

    class Meta:
        model = Project_Submission
        fields = (
            'submission',
        )

class Required_SkillSerializer(serializers.ModelSerializer):
    skill_name = serializers.SerializerMethodField()

    def get_skill_name(self, obj):
        return obj.skill.skill_name

    class Meta:
        model = Required_Skill
        fields = [
            "project",
            "skill",
            "skill_name",
        ]
        extra_kwargs = {"project": {"write_only": True}, "skill": {"write_only": True}}

from django.conf import settings
class ProjectSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(
        read_only=True, default=serializers.CurrentUserDefault()
    )
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
    skills = serializers.SerializerMethodField()
    am_i_working_on_this = serializers.SerializerMethodField()
    submission = serializers.SerializerMethodField()

    def get_submission(self, obj):
        try:
            obj = obj.project_submission
        except :
            return None
        if obj.submission is not None:
            return settings.MEDIA_URL + str(obj.submission)
        else :
            return None
    
    def get_am_i_working_on_this(self, obj):
        try:
            user = self.context['request'].user
            if (
                obj.project_submission.freelancer is not None
                and obj.project_submission.freelancer.id == user.id
            ):
            
                return 1
            else:
                return 0
                
        except:
            return 0
        
    def get_first_name(self, obj):
        return obj.owner.first_name

    def get_last_name(self, obj):
        return obj.owner.last_name

    def get_skills(self, obj):
        required_skills = Required_Skill.objects.filter(project=obj)
        required_skill_serializer = Required_SkillSerializer(required_skills, many=True)
        return required_skill_serializer.data

    class Meta:
        model = Project
        fields = "__all__"
        read_only_fields = ["id"]

    def create(self, validated_data):
        validated_data["owner"] = self.context["request"].user
        return super().create(validated_data)
