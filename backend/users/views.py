from django.shortcuts import render 
from rest_framework.response import Response 
from rest_framework.views import APIView  
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate 
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer


class LoginView(APIView): 
    def post(self, request):
        print('came here')
        username = request.data['username']
        password = request.data['password'] 
        user = authenticate(username=username, password=password) 
        if user is None: 
            raise AuthenticationFailed('invalid credentials') 
        
        refresh = RefreshToken.for_user(user) 
        access = refresh.access_token 
        user_data = UserSerializer(user) 
        user_dict = user_data.data
        response_data = {
            'refresh': str(refresh),
            'access': str(access), 
            'user': {
                'username': user_dict['username'],
                'email': user_dict['email'], 
                'is_authenticated': user_dict['is_authenticated'] and user_dict['is_active'], 
                'is_superuser': user_dict['is_superuser'],
            }
        }
    
        return Response(response_data) 
      
    

class UserStatusView(APIView): 
    permission_classes = [IsAuthenticated] 
    def get(self, request): 
        user = request.user
        user_data = UserSerializer(user) 
        user_dict = user_data.data
        response_data = {
            'user': {
                'username': user_dict['username'],
                'email': user_dict['email'], 
                'is_authenticated': user_dict['is_authenticated'] and user_dict['is_active'], 
                'is_superuser': user_dict['is_superuser'],
            }
        }
        return Response(response_data)