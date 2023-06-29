from django.urls import path
from . import views

urlpatterns = [
       path('login', views.login_api),
       path('freelancer_regester', views.register_freelancer_api)
]