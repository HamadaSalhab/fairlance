from django.urls import path
from .views import TransactionRetrieveView

urlpatterns = [
    path('retrieve/', TransactionRetrieveView.as_view()),
]