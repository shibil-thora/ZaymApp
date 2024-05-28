from rest_framework import serializers 
from . models import Area, Service, ServiceType , UserArea, ServiceAreas
from users.serializers import UserSerializer


class AreaSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Area 
        fields = '__all__'


class UserAreaSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = UserArea 
        fields = '__all__' 


class ServiceAreaSerializer(serializers.ModelSerializer): 
    area_data = AreaSerializer(read_only=True)
    class Meta: 
        model = ServiceAreas 
        fields = [
            'area_data'
        ]


class ServiceSerializer(serializers.ModelSerializer): 
    get_user = UserSerializer(read_only=True)
    get_areas = ServiceAreaSerializer(many=True)
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


class DisplayServiceSerializer(serializers.ModelSerializer): 
    get_user = UserSerializer(read_only=True) 
    get_areas = ServiceAreaSerializer(many=True)
    class Meta: 
        model = Service 
        fields = [
            'id', 
            'business_name', 
            'service_type', 
            'cover_image', 
            'description', 
            'get_user', 
            'get_areas',
        ]


class ServiceTypeSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = ServiceType 
        fields = '__all__'
    

    