from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import Skill
from rest_framework.response import Response
from django.conf import settings

from .models import UserExtra


class UserExtraSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(use_url=True, required=False)
    profile_cv = serializers.FileField(use_url=True, required=False)
    bio = serializers.FileField(required=False)

    class Meta:
        model = UserExtra
        fields = ("profile_image", "bio", "profile_cv")


class UserSerializer(serializers.ModelSerializer):
    profile_image = serializers.SerializerMethodField()

    def get_profile_image(self, obj):
        try:
            obj = obj.extradetails
        except:
            return None
        return settings.MEDIA_URL + str(obj.profile_image)

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
            "profile_image",
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
        if self.context["request"].user.id != instance.id:
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


# class WalletSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Wallet
#         fields = "__all__"
