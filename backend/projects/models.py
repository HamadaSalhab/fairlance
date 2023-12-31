from django.db import models
from django.contrib.auth.models import User
from users.models import Skill


class Project(models.Model):
    STATUS_CHOICES = (
        ("hiring", "Hiring"),
        ("offering", "Offering"),
        ("in_progress", "In Progress"),
        ("delivered", "Delivered"),
        ("finished", "Finished"),
        ("conflict", "Conflict"),
    )

    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="owned_projects"
    )
    title = models.CharField(max_length=256, null=False)
    description = models.CharField(max_length=4096, null=False)
    media = models.URLField(max_length=256, default="http://codeforces.com")
    deadline = models.DateTimeField(null=False)
    price_min = models.DecimalField(max_digits=10, decimal_places=1, default=0.0)
    price_max = models.DecimalField(max_digits=10, decimal_places=1, default=100.0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="hiring")

def upload_to(instance, filename):
    return "files/{filename}".format(filename=filename)

class Project_Submission(models.Model):
    project = models.OneToOneField(
        Project,  primary_key=True, on_delete=models.CASCADE, related_name='project_submission'
    )
    freelancer = models.ForeignKey(
        User, on_delete=models.CASCADE,default=None, null=True, blank=True, related_name="onworkingprojects"
    )
    bid = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    submission = models.FileField(upload_to=upload_to, blank=True, null=True, default=None)


class Required_Skill(models.Model):
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="required_skills"
    )
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE)
