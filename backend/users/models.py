from django.db import models
from django.contrib.auth.models import User

class Skill(models.Model):
    skill_id = models.IntegerField(primary_key=True)
    skill_name = models.CharField(max_length=32)

class Freelancer(models.Model):
    freelancer = models.OneToOneField(User, on_delete=models.CASCADE, related_name='freelancing')
    rating = models.FloatField()

class Available_Skill(models.Model):
    freelancer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='available_skills')
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE)

class Message(models.Model):
    message_id = models.IntegerField(primary_key=True)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    msg_date = models.DateTimeField()
    msg_content = models.CharField(max_length=4096)
