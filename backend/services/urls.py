from django.urls import path 
from . import views

urlpatterns = [
    path('set_service/', views.SetService.as_view())
]
