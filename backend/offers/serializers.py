from rest_framework import serializers

from offers.models import Offer



class OfferSerializer(serializers.ModelSerializer):
    project_id = serializers.SerializerMethodField()
    project_title = serializers.SerializerMethodField()
    project_owner = serializers.SerializerMethodField()

    def get_project_id(self, obj):
        return obj.application.project_id

    def get_project_title(self, obj):
        return obj.application.project.title

    def get_project_owner(self, obj):
        return obj.application.project.owner.first_name + " " + obj.application.project.owner.last_name
    class Meta:
        model = Offer
        fields = "__all__"
