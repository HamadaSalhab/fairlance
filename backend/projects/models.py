from django.db import models

from users.models import (
    Users,
    Skills,
)

class Projects(models.Model):
    project_id = models.IntegerField(primary_key=True)
    owner = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='owned_projects')
    title = models.CharField(max_length=256)
    description = models.CharField(max_length=256)
    media = models.ImageField(upload_to='./project_media/')
    deadline = models.DateTimeField()
    price_min = models.DecimalField(max_digits=10, decimal_places=1)
    price_max = models.DecimalField(max_digits=10, decimal_places=1)

class Required_Skills(models.Model):
    project = models.ForeignKey(Projects, on_delete=models.CASCADE, related_name='required_skills')
    skill = models.ForeignKey(Skills, on_delete=models.CASCADE)

