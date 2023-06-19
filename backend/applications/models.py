from django.db import models

from users.models import Users
from projects.models import Projects
from transactions.models import Payments

class Applications(models.Model):
    project = models.ForeignKey(Projects, on_delete=models.CASCADE)
    freelancer = models.ForeignKey(Users, on_delete=models.CASCADE)

class Employments(models.Model):
    employment = models.ForeignKey(Applications, on_delete=models.CASCADE)
    payment = models.ForeignKey(Payments, on_delete=models.CASCADE)
    state = models.CharField(max_length=256)

