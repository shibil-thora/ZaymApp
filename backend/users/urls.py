from django.urls import path 
from . import views

urlpatterns = [
    path('login/', views.UserLoginView().as_view()), 
    path('signup/', views.UserSignUpView().as_view()), 
    path('user_status/', views.UserStatusView.as_view()), 
    path('zaymadmin/users_list/', views.UserListView.as_view()), 
    path('zaymadmin/toggleblock/', views.ToggleBlockView.as_view()), 
    path('edit_area/', views.EditUserArea.as_view()),
    path('update_profile_pic/', views.UpdateProfilePic.as_view()), 
]
