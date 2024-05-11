from django.urls import path 
from . import views

urlpatterns = [
    path('login/', views.LoginView().as_view()), 
    path('user_status/', views.UserStatusView.as_view()), 
]
