from django.urls import path
from . import views

urlpatterns = [
    path("", views.ProjectListAPIView.as_view()),
    path("recent/", views.ProjectRecentAPIView.as_view()),
    path("add/", views.ProjectCreateAPIView.as_view()),
    path("<int:pk>/", views.ProjectDetailAPIView.as_view()),
    path('<int:pk>/update/',views.ProjectSubmissionUpdateAPIView.as_view()),
    path('<int:pk>/pay/',views.ProjectPayAPIView.as_view()),
    # path('<int:pk>/delete/', views.ProjectDestroyAPIView.as_view()),
]
