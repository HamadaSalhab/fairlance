from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Users, Freelancers
from rest_framework.validators import UniqueValidator

class FreelancersSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255, validators=[UniqueValidator(queryset=User.objects.all())])
    username = serializers.CharField(max_length=150, validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(min_length = 8, max_length = 12,write_only=True)
    first_name = serializers.CharField(max_length=30)
    last_name = serializers.CharField(max_length=30)


    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        users = Users(user=user, is_moderator=False)
        freelancer = Freelancers.objects.create(freelancer=users)
        return freelancer
    

