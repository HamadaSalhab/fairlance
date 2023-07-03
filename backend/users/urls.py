from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from . import views

urlpatterns = [
    path("", views.UserCreateAPIView.as_view()),
    path("<int:pk>/", views.UserDetailAPIView.as_view()),
    path("<int:pk>/update/", views.UserUpdateAPIView.as_view()),
    path("auth/", views.CustomAuthTokenView.as_view()),
]
