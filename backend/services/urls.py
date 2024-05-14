from django.urls import path 
from . import views

urlpatterns = [
    path('get_areas/', views.GetAreas.as_view()), 
    path('set_scripts/', views.SetService.as_view()), 
]
