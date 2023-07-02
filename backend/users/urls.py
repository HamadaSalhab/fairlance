from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from . import views

urlpatterns = [
    path('',views.UserCreateAPIView.as_view()),
    path('auth/',obtain_auth_token),
    path('skills/',views.SkillListAPIView.as_view()),
    path('<int:pk>/',views.UserDetailAPIView.as_view()),
]