from django.urls import path 
from . import views

urlpatterns = [
    path('get_services/', views.GetServices.as_view())
]
