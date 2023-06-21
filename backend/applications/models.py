from django.db import models
from django.contrib.auth.models import User
from projects.models import Project
from transactions.models import Payment

class Application(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    freelancer = models.ForeignKey(User, on_delete=models.CASCADE)

class Employment(models.Model):
    employment = models.ForeignKey(Application, on_delete=models.CASCADE)
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE)
    
