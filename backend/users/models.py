from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Skills(models.Model):
    skill_id = models.IntegerField(primary_key=True)
    skill_name = models.CharField(max_length=255)

class Users(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, default=None)
    is_moderator = models.BooleanField(default=False)

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Users.objects.get_or_create(user=instance)

@receiver(post_save, sender=User)
def save_user_users(sender, instance, **kwargs):
    instance.users.save()

class Freelancers(models.Model):
    freelancer = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='freelancing')
    rating = models.FloatField(default= 1)

class Available_Skills(models.Model):
   freelancer = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='available_skills', default=None)
   skill = models.ForeignKey(Skills, on_delete=models.CASCADE, default=None)

class Messages(models.Model):
    message_id = models.IntegerField(primary_key=True)
    sender = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='received_messages')
    msg_date = models.DateTimeField()
    msg_content = models.CharField(max_length=256)
