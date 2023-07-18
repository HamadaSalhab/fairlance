import datetime

from rest_framework import serializers

from transactions.models import Payment
from .models import Application, Employment


class ApplicationSerializer(serializers.ModelSerializer):
    freelancer_first_name = serializers.SerializerMethodField()
    freelancer_last_name = serializers.SerializerMethodField()
    project_id = serializers.SerializerMethodField()
    project_title = serializers.SerializerMethodField()

    def get_project_id(self, obj):
        return obj.project.id
    
    def get_project_title(self, obj):
        return obj.project.title
    
    def get_freelancer_first_name(self, obj):
        return obj.freelancer.first_name

    def get_freelancer_last_name(self, obj):
        return obj.freelancer.last_name

    class Meta:
        model = Application
        fields = "__all__"

    def create(self, validated_data):
        validated_data['freelancer'] = self.context['request'].user
        return super().create(validated_data)


class EmploymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employment
        fields = "__all__"

    def validate_application(self, application):
        if application.freelancer != self.context['request'].user:
            raise serializers.ValidationError('User and freelancer assigned to the application should be the same.')

    def create(self, validated_data):
        payment = Payment(payer=validated_data['application'].project.owner, payee=self.context['request'].user,
                          amount=validated_data['application'].bid, date=datetime.datetime.now())
        validated_data['payment'] = payment
        return super().create(validated_data)
