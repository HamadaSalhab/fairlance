from django.db import models
from django.contrib.auth.models import User
from projects.models import Project
from transactions.models import Payment


class Application(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    freelancer = models.ForeignKey(User, on_delete=models.CASCADE)
    bid = models.DecimalField(max_digits=10, decimal_places=1, default=0.0)
    proposal = models.CharField(max_length=4096, null=False, default="")


class Employment(models.Model):
    application = models.ForeignKey(Application, on_delete=models.CASCADE)
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE)
