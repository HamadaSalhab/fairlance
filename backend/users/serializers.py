from rest_framework import serializers
from django.contrib.auth.models import User
from .models import User, Freelancer
from rest_framework.validators import UniqueValidator


