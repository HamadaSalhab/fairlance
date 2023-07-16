from django.db import models
from django.contrib.auth.models import User


class Skill(models.Model):
    skill_id = models.IntegerField(primary_key=True)
    skill_name = models.CharField(max_length=255)


# class Wallet(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="wallet")
#     address = models.CharField(max_length=64)
#     balance = models.IntegerField(default=0)


class Freelancer(models.Model):
    freelancer = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="freelancing"
    )
    rating = models.FloatField()


class Available_Skill(models.Model):
    freelancer = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="available_skills"
    )
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE)




def upload_to(instance, filename):
    return "images/{filename}".format(filename=filename)


class UserExtra(models.Model):
    user = models.OneToOneField(
        User, primary_key=True, on_delete=models.CASCADE, related_name="extradetails"
    )
    bio = models.CharField(max_length=4096)
    profile_image = models.ImageField(upload_to=upload_to, blank=True, null=True)
    profile_cv = models.FileField(upload_to="profile_cvs/", null=True)
    balance = models.IntegerField(default=0)