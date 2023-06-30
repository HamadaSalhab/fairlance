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
    

class ProjectOwnerSerializer(serializers.ModelSerializer):
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
    owner_id = serializers.SerializerMethodField()

    def get_first_name(self, obj):
        first_name = obj.owner.first_name
        return first_name
    
    def get_last_name(self, obj):
        last_name = obj.owner.last_name
        return last_name
    
    def get_owner_id(self, obj):
        owner_id = obj.owner.id
        return owner_id
    
    class Meta:
        model = Project
        fields = '__all__'