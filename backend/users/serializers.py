from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Skill

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'password',
            'email',
            'date_joined',
        )
        extra_kwargs = {'password': {'write_only': True}}


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = (
            'skill_id',
            'skill_name'
        )