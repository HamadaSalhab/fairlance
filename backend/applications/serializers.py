from rest_framework import serializers
from .models import Application, Employment


class ApplicationSerializer(serializers.ModelSerializer):
    freelancer_first_name = serializers.SerializerMethodField()
    freelancer_last_name = serializers.SerializerMethodField()

    def get_freelancer_first_name(self, obj):
        return obj.freelancer.first_name

    def get_freelancer_last_name(self, obj):
        return obj.freelancer.last_name

    class Meta:
        model = Application
        fields = '__all__'


class EmploymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employment
        fields = '__all__'
