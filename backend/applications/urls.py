from django.urls import path, include
from .views import ApplicationApiView, ApplicationDetailApiView, EmploymentDetailApiView, EmploymentApiView

urlpatterns = [
    path('application/', ApplicationApiView.as_view(), name='application'),
    path('application/<int:application_id>/', ApplicationDetailApiView.as_view(), name='applicationdetail'),
    path('employment/', EmploymentApiView.as_view(), name='employment'),
    path('employment/<int:employment_id>/', EmploymentDetailApiView.as_view(), name='employmentdetail'),
]