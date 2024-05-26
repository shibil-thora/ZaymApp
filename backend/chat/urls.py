from django.urls import path 
from . import views

urlpatterns = [
    path('get_chats/', views.GetAvailableChats.as_view())
]
