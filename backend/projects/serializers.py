from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Project, Required_Skill


class Required_SkillSerializer(serializers.ModelSerializer):
    skill_name = serializers.SerializerMethodField()

    def get_skill_name(self, obj):
        return obj.skill.skill_name
    class Meta:
        model = Required_Skill
        fields = [
            'project',
            'skill',
            'skill_name',
        ]
        extra_kwargs = {'project': {'write_only': True},  'skill': {'write_only': True}}

class ProjectSerializer(serializers.ModelSerializer):
    owner= serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    # skills = Required_SkillSerializers
    class Meta:
        model = Project
        fields = ['id', 'owner', 'title', 'description', 'media', 'deadline', 'price_min', 'price_max', 'status']
        read_only_fields = ['id']

    def create(self, validated_data):
        validated_data['owner'] = self.context['request'].user
        print(validated_data)
        return super().create(validated_data)


class ProjectDetailsSerializer(serializers.ModelSerializer):
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
    owner_id = serializers.SerializerMethodField()
    skills = serializers.SerializerMethodField()

    def get_first_name(self, obj):
        return obj.owner.first_name
    
    def get_last_name(self, obj):
        return obj.owner.last_name
    
    def get_owner_id(self, obj):
        return obj.owner.id
    
    def get_skills(self, obj):
        required_skills = Required_Skill.objects.filter(project=obj)
        required_skill_serializer = Required_SkillSerializer(required_skills, many=True)
        return required_skill_serializer.data

    class Meta:
        model = Project
        fields = '__all__'