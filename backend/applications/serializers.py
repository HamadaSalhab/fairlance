from rest_framework import serializers
from .models import Application, Employment


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'


class EmploymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employment
        fields = '__all__'
