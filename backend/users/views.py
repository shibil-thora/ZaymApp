from django.shortcuts import render 
from rest_framework.response import Response 
from rest_framework.views import APIView  
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from django.contrib.auth import authenticate 
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer 
from .models import MyUsers as User 
from django.core.validators import EmailValidator
from services.serializers import AreaSerializer
from services.models import Area, UserArea 


class UserLoginView(APIView): 
    def post(self, request):
        username = request.data['username']
        password = request.data['password'] 
        user = authenticate(username=username, password=password) 
        if user is None: 
            raise AuthenticationFailed('invalid credentials') 
        
        refresh = RefreshToken.for_user(user) 
        access = refresh.access_token 
        user_data = UserSerializer(user) 
        user_dict = user_data.data 
        area = None 
        try: 
            area_obj = user.area.area 
            area = AreaSerializer(area_obj).data
        except: 
            pass

        response_data = {
            'refresh': str(refresh),
            'access': str(access), 
            'user': {
                'username': user_dict['username'],
                'email': user_dict['email'], 
                'is_authenticated': user_dict['is_authenticated'] and user_dict['is_active'], 
                'is_superuser': user_dict['is_superuser'],
                'is_provider': user_dict['is_provider'],
                'area': area
            }
        }
    
        return Response(response_data) 
    

class UserStatusView(APIView): 
    def get(self, request): 
        user = request.user
        user_data = UserSerializer(user) 
        user_dict = user_data.data
        area = None 
        try: 
            area_obj = user.area.area 
            area = AreaSerializer(area_obj).data
        except: 
            pass
        
        response_data = {
            'user': {
                'username': user_dict['username'],
                'email': user_dict['email'], 
                'is_authenticated': user_dict['is_authenticated'] and user_dict['is_active'], 
                'is_superuser': user_dict['is_superuser'],
                'is_provider': user_dict['is_provider'],
                'area': area
            }
        }
        return Response(response_data) 
    

class UserSignUpView(APIView): 
    def post(self, request): 
        username = request.data.get('username')
        email = request.data.get('email')
        pass1 = request.data.get('pass1')
        pass2 = request.data.get('pass2')
        print(username, email, pass1, pass2)

        if not pass1 == pass2: 
            raise AuthenticationFailed('passwords do not match!') 
        
        if User.objects.filter(username=username): 
            raise AuthenticationFailed('username already exists') 
        
        if User.objects.filter(email=email):
            raise AuthenticationFailed('email already exists') 
        
        if len(username.strip()) < 4:  
            raise AuthenticationFailed('username is short')
        
        if str(username).isdigit(): 
            raise AuthenticationFailed('invalid username') 
        
        try: 
            EmailValidator()(email)
        except: 
            raise AuthenticationFailed('Enter a valid email') 
        
        if len(pass1.strip()) < 5: 
            raise AuthenticationFailed('short password') 
        
        User.objects.create_user(username=username, email=email, password=pass1)
        
        return Response({'message': 'user Created'}) 
    

class UserListView(APIView): 
    permission_classes = [IsAdminUser]
    def get(self, request): 
        user_objs = User.objects.all()
        user_objs = user_objs.exclude(is_superuser=True)
        user_set = UserSerializer(user_objs, many=True)
        return Response({"users": user_set.data})
    

class ToggleBlockView(APIView): 
    permission_classes = [IsAdminUser]
    def post(self, request): 
        user_id = request.data['id'] 
        user = User.objects.get(id=user_id) 
        if user.is_active: 
            user.is_active = False
            user.save()
        else:
            user.is_active = True 
            user.save()
        return Response({'id': user_id, 'status': user.is_active})
    

class EditUserArea(APIView): 
    permission_classes = [IsAuthenticated]
    def post(self, request): 
        user = request.user 
        new_area = Area.objects.get(id=request.data['id'])
        try:
            area = user.area 
            area.area = new_area 
            area.save()
            return Response(AreaSerializer(new_area).data)
        except: 
            UserArea.objects.create(user=request.user, area=new_area)
            return Response(AreaSerializer(new_area).data)