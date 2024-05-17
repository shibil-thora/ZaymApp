from django.shortcuts import render
from rest_framework.response import Response 
from rest_framework.views import APIView 
from .models import Area
from .serializers import AreaSerializer, ServiceSerializer, ServiceTypeSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from providers.views import IsProvider
from rest_framework.exceptions import AuthenticationFailed
from . models import Service, ServiceType
from users.serializers import UserSerializer 
from users.models import MyUsers as User


class GetAreas(APIView): 
    def get(self, request): 
        area_objs = Area.objects.all().order_by('village') 
        area_dict = AreaSerializer(area_objs, many=True)

        response_data = {
            'areas': area_dict.data, 
        }
        return Response(response_data) 
    

class GetServices(APIView): 
    permission_classes = [IsAdminUser]
    def get(self, request):
        services_obj = Service.objects.all().order_by('permit') 
        users_obj = User.objects.all() 
        users = UserSerializer(users_obj, many=True).data
        services = ServiceSerializer(services_obj, many=True).data 

        response_data = {
            'users': users, 
            'services': services, 
        }
        return Response(response_data) 
    

#single use purpose when deployment
class SetService(APIView): 
    def post(self, request): 
        APPLIED = True
        if not APPLIED: 
            print('came here')
            print(len(request.data['villages'])) #this will be 1495
            for village in request.data['villages']: 
                Area.objects.create(
                    state=village['state'], 
                    dist=village['dist'], 
                    sub_dist=village['sub_dist'], 
                    village=village['village'] ,
                    area_name=f'{village['village']} {village['sub_dist']} {village['dist']} {village['state']}'
                )
            return Response({'message': 'success'}) 
        return Response({'message': 'already applied'})


class CreateService(APIView): 
    permission_classes = [IsAuthenticated]
    def post(self, request): 
        image = None
        try:
            image = request.FILES['image'] 
        except: 
            raise AuthenticationFailed('* image not selected') 
        servie_type = request.data['service']
        business_name = request.data['business_name']
        description = request.data['description']
        area_name = request.data['area']
        if len(business_name.strip()) < 4: 
            raise AuthenticationFailed('business name should be ateast 4 letters') 
        
        if Service.objects.filter(business_name=business_name): 
            raise AuthenticationFailed('business name is already used') 
        
        if len(description.strip()) < 10:
            raise AuthenticationFailed('description should be alteast 10 letters') 
        
        if len(area_name.strip()) < 5: 
            raise AuthenticationFailed('area is not selected')
        
        user = request.user
        service = Service.objects.create(
            user=user, 
            business_name=business_name, 
            service_type=servie_type, 
            description=description, 
            cover_image=image
        ) 
        user.is_provider = True
        user.save()
        response_data = {
            'is_provider': True, 
            'service': ServiceSerializer(service).data,
        } 
        return Response(response_data)
    

class AllowPermit(APIView): 
    permission_classes = [IsAdminUser]
    def post(self, request): 
        service_obj = Service.objects.get(id=request.data['id'])
        service_obj.permit = not service_obj.permit 
        service_obj.save()
        return Response({'permit': service_obj.permit}) 
    

class GetTypes(APIView): 
    permission_classes = [IsAdminUser]
    def get(self, request): 
        service_objs = ServiceType.objects.all() 
        services = ServiceTypeSerializer(service_objs, many=True).data
        return Response(services)  
    

class HideTypes(APIView): 
    permission_classes = [IsAdminUser] 
    def post(self, request): 
        service = ServiceType.objects.get(id=request.data['id'])
        service.is_hidden = True 
        service.save()
        service = ServiceTypeSerializer(service).data
        return Response(service)
    

class UnHideTypes(APIView): 
    permission_classes = [IsAdminUser]
    def post(self, request): 
        service = ServiceType.objects.get(id=request.data['id'])
        service.is_hidden = False
        service.save()
        service = ServiceTypeSerializer(service).data
        return Response(service)