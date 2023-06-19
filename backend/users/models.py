from django.db import models

class Skills(models.Model):
    skill_id = models.IntegerField(primary_key=True)
    skill_name = models.CharField(max_length=255)

class Users(models.Model):
    user_id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=256)
    email = models.EmailField()
    password = models.CharField(max_length=256)
    firstname = models.CharField(max_length=256)
    surname = models.CharField(max_length=256)
    is_moderator = models.BooleanField(default=False)

class Freelancers(models.Model):
    freelancer = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='freelancing')
    rating = models.FloatField()

class Available_Skills(models.Model):
   freelancer = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='available_skills')
   skill = models.ForeignKey(Skills, on_delete=models.CASCADE)

class Messages(models.Model):
    message_id = models.IntegerField(primary_key=True)
    sender = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='received_messages')
    msg_date = models.DateTimeField()
    msg_content = models.CharField(max_length=256)
