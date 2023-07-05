from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.OfferCreateView.as_view()),
    path('list/', views.OfferListView.as_view()),
    path('<int:pk>/delete/', views.OfferDestroyView.as_view()),
]
