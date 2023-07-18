from django.contrib import admin

from .models import Project, Required_Skill, Project_Submission

admin.site.register(Project)
admin.site.register(Required_Skill)
admin.site.register(Project_Submission)