from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from django.conf.urls.static import static
from django.conf import settings

from . import views
from applications.views import ApplicationListFreelancerView

urlpatterns = [
    path("", views.UserCreateAPIView.as_view()),
    path("<int:pk>/", views.UserDetailAPIView.as_view()),
    path("<int:pk>/update/", views.UserUpdateAPIView.as_view()),
    path("<int:pk>/update/profile-image/", views.UserExtraUpdateAPIView.as_view()),
    path("<int:pk>/applications/", ApplicationListFreelancerView.as_view()),
    path("auth/", views.CustomAuthTokenView.as_view()),
    # path("<int:pk>/wallet/", views.WalletRetrieveAPIView.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
