from django.urls import path, include
from .views import ApplicationCreateView, ApplicationUpdateView, ApplicationDestroyView, ApplicationRetrieveView, \
    ApplicationListView
from .views import EmploymentCreateView, EmploymentRetrieveView, EmploymentUpdateView, EmploymentDestroyView

urlpatterns = [
    path('application/create/', ApplicationCreateView.as_view()),
    path('application/update/', ApplicationUpdateView.as_view()),
    path('application/destroy/', ApplicationDestroyView.as_view()),
    path('application/retrieve/', ApplicationRetrieveView.as_view()),
    path('application/list/', ApplicationListView.as_view()),
    path('application/create/', ApplicationCreateView.as_view()),
    path('employment/create/', EmploymentCreateView.as_view()),
    path('employment/retrieve/', EmploymentRetrieveView.as_view()),
    path('employment/update/', EmploymentUpdateView.as_view()),
    path('employment/destroy/', EmploymentDestroyView.as_view()),
]
