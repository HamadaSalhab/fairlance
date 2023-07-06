from django.urls import path
from .views import (
    ApplicationCreateView,
    ApplicationUpdateView,
    ApplicationDestroyView,
    ApplicationListView,
    ApplicationListFreelancerView,
)
from .views import (
    EmploymentCreateView,
    EmploymentRetrieveView,
    EmploymentUpdateView,
    EmploymentDestroyView,
)

urlpatterns = [
    path("application/create/", ApplicationCreateView.as_view()),
    path("application/update/", ApplicationUpdateView.as_view()),
    path("application/destroy/<int:pk>", ApplicationDestroyView.as_view()),
    path("application/list/<int:project_id>/", ApplicationListView.as_view()),
    path(
        "application/listfreelancer/<int:freelancer_id>/",
        ApplicationListFreelancerView.as_view(),
    ),
    path("application/create/", ApplicationCreateView.as_view()),
    path("employment/create/", EmploymentCreateView.as_view()),
    path("employment/retrieve/<int:pk>", EmploymentRetrieveView.as_view()),
    path("employment/update/", EmploymentUpdateView.as_view()),
    path("employment/destroy/", EmploymentDestroyView.as_view()),
]
