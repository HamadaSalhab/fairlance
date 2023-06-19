from django.db import models
from users.models import Users

class Payments(models.Model):
    payer = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='sent_transactions')
    payee = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='received_transactions')
    amount = models.DecimalField(max_digits=10, decimal_places=1)
    date = models.DateTimeField()   
