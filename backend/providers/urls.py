from django.urls import path 
from . import views

urlpatterns = [
    path('call/', views.GetProvi.as_view())
]
