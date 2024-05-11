from rest_framework import serializers 
from . models import MyUsers


class UserSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = MyUsers 
        fields = ['username', 'email', 'is_authenticated', 'is_active', 'is_superuser'] 

