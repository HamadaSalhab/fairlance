from django.db import models
from django.contrib.auth.models import User
from users.models import Skill

class Project(models.Model):
    STATUS_CHOICES = (
        ('hiring', 'Hiring'),
        ('communication', 'Communication'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('conflict', 'Conflict'),
    )

    project_id = models.IntegerField(primary_key=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owned_projects')
    title = models.CharField(max_length=256, null=False)
    description = models.CharField(max_length=4096, null=False)
    media = models.URLField(max_length=256)
    deadline = models.DateTimeField(null=False)
    price_min = models.DecimalField(max_digits=10, decimal_places=1, default=0.0)
    price_max = models.DecimalField(max_digits=10, decimal_places=1, default=100.0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='hiring')

class Required_Skill(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='required_skills')
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE)

