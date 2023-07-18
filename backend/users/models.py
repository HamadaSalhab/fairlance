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
    return "files/{filename}".format(filename=filename)

class UserExtra(models.Model):
    user = models.OneToOneField(
        User, primary_key=True, on_delete=models.CASCADE, related_name="extradetails"
    )
    profile_image = models.ImageField(upload_to=upload_to, blank=True, null=True)
    profile_cv = models.FileField(upload_to=upload_to, blank=True, null=True)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    wallet_address = models.CharField(max_length=256, default='not-specified')
    transaction_hash = models.CharField(max_length=128, blank=True, null=True, default=None)

class Transaction(models.Model):
    transaction_hash = models.CharField(max_length=128, unique=True)
    
