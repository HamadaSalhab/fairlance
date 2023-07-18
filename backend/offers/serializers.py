import datetime

from rest_framework import serializers

from offers.models import Offer


class OfferSerializer(serializers.ModelSerializer):
    project_id = serializers.SerializerMethodField()
    project_title = serializers.SerializerMethodField()
    project_owner = serializers.SerializerMethodField()
    offer_bid = serializers.SerializerMethodField()
    
    def get_project_id(self, obj):
        return obj.application.project_id

    def get_project_title(self, obj):
        return obj.application.project.title

    def get_project_owner(self, obj):
        return obj.application.project.owner.first_name + " " + obj.application.project.owner.last_name

    def get_offer_bid(self, obj):
        return obj.application.bid
    
    class Meta:
        model = Offer
        fields = ["project_id","project_title","project_owner","application", "offer_bid"]

    def validate_application(self, application):
        if application.project.owner != self.context['request'].user:
            raise serializers.ValidationError('User and owner of the project should be the same.')
        if application.bid > application.project.owner.extradetails.balance:
            raise serializers.ValidationError("Owner of the project doesn't have enough money.")
        return application

    def create(self, validated_data):
        print(validated_data)
        validated_data['expiration_time'] = datetime.datetime.now() + datetime.timedelta(days=1)
        self.context['request'].user.extradetails.balance -= validated_data['application'].bid
        self.context['request'].user.extradetails.save()
        validated_data['application'].project.status = 'offering'
        validated_data['application'].project.save()
        return super().create(validated_data)
