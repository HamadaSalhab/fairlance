from rest_framework import serializers

from offers.models import Offer


class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = '__all__'


class OfferDetailSerializer(serializers.ModelSerializer):
    project_id = serializers.SerializerMethodField()
    project_title = serializers.SerializerMethodField()

    def get_project_id(self, obj):
        return obj.application.project_id

    def get_project_title(self, obj):
        return obj.application.project.title

    class Meta:
        model = Offer
        fields = '__all__'
