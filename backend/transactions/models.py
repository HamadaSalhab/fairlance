from django.db import models
from django.contrib.auth.models import User


class Payment(models.Model):
    payer = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="sent_transactions"
    )
    payee = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="received_transactions"
    )
    amount = models.DecimalField(max_digits=10, decimal_places=1)
    date = models.DateTimeField()
