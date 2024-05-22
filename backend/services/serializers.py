from rest_framework import serializers 
from . models import Area, Service, ServiceType , UserArea


class AreaSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Area 
        fields = '__all__'


class UserAreaSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = UserArea 
        fields = '__all__' 


class ServiceSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Service 
        fields = [
            'id',
            'user', 
            'business_name', 
            'service_type', 
            'available', 
            'permit', 
            'description', 
            'cover_image', 
            'get_user', 
            'get_areas', 
        ]


class ServiceTypeSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = ServiceType 
        fields = '__all__'
    
    