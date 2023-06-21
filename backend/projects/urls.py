from django.urls import path
from .views import ProjectAPIView
urlpatterns = [
    path('',ProjectAPIView.as_view()),
    path('<int:project_id>/',ProjectAPIView.as_view()),     
]