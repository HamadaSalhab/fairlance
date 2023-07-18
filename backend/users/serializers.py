from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import Skill
from rest_framework.response import Response
from django.conf import settings

from .models import UserExtra, Transaction


class UserExtraSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(use_url=True, required=False)
    profile_cv = serializers.FileField(use_url=True, required=False)

    class Meta:
        model = UserExtra
        fields = ("profile_image", "profile_cv", "wallet_address", "transaction_hash")

    def update(self, instance, validated_data):
        updated_address = validated_data.get("wallet_address")
        if (
            not updated_address is None
            and UserExtra.objects.exclude(pk=instance.pk)
            .filter(wallet_address=updated_address)
            .exists()
        ):
            raise serializers.ValidationError("Address already exists.")

        updated_transaction = validated_data.get("transaction_hash")
        print(updated_transaction)
        if (
            not updated_transaction is None
            and Transaction.objects.filter(transaction_hash=updated_transaction).exists()
        ):
            raise serializers.ValidationError("This transcation was used!")
        
        elif (updated_transaction is not None):
            Transaction.objects.create(transaction_hash=updated_transaction)

        return super().update(instance, validated_data)


class UserSerializer(serializers.ModelSerializer):
    profile_image = serializers.SerializerMethodField()
    profile_cv = serializers.SerializerMethodField()
    wallet_address = serializers.SerializerMethodField()

    def get_wallet_address(self, obj):
        try: 
            obj = obj.extradetails
        except:
            return None
        return obj.wallet_address 
        
    def get_profile_image(self, obj):
        try:
            obj = obj.extradetails
        except:
            return None
        if obj.profile_image is not None:
            return settings.MEDIA_URL + str(obj.profile_image)
        else :
            return None
    
    def get_profile_cv(self, obj):
        try: 
            obj = obj.extradetails
        except:
            return None
        if obj.profile_image is not None:
            return settings.MEDIA_URL + str(obj.profile_cv)
        else :
            return None

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
            "profile_cv",
            "wallet_address",
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
