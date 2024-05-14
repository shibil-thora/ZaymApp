from rest_framework import serializers 
from . models import Area, Service, ServiceType, ServiceAreas , UserArea


class AreaSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Area 
        fields = '__all__'


class UserAreaSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = UserArea 
        fields = '__all__' 

    
    