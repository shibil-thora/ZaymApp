from django.urls import path 
from . import views

urlpatterns = [
    path('get_areas/', views.GetAreas.as_view()), 
    path('set_scripts/', views.SetService.as_view()), 
    path('create/', views.CreateService.as_view()), 
    path('get_services/', views.GetServices.as_view()), 
    path('allow_permit/', views.AllowPermit.as_view()), 
]
