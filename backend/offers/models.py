from django.db import models
from applications.models import Application


class Offer(models.Model):
    application = models.OneToOneField(
        Application, primary_key=True, on_delete=models.CASCADE, related_name="application"
    )
    expiration_time = models.DateTimeField()
