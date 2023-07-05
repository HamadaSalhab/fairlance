from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import Skill, Wallet
from rest_framework.response import Response


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "password",
            "email",
            "date_joined",
        )
        extra_kwargs = {"password": {"write_only": True}}


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "first_name",
            "last_name",
        )

    def update(self, instance, validated_data):
        print(instance)
        print(self.context["request"].user)
        if self.context['request'].user.id != instance.id:
            return instance
        return super().update(instance, validated_data)


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ("skill_id", "skill_name")


class SkillIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["skill_id"]


class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = '__all__'