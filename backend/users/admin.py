from django.contrib import admin

from .models import Skill, UserExtra, Transaction

admin.site.register(Skill)

admin.site.register(UserExtra)

admin.site.register(Transaction)