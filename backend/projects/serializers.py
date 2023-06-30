from rest_framework import serializers
from .models import Project
from django.contrib.auth.models import User

class ProjectSerializer(serializers.ModelSerializer):
    owner= serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    class Meta:
        model = Project
        fields = ['id', 'owner', 'title', 'description', 'media', 'deadline', 'price_min', 'price_max', 'status']
        read_only_fields = ['id']

    def create(self, validated_data):
        validated_data['owner'] = self.context['request'].user
        return super().create(validated_data)