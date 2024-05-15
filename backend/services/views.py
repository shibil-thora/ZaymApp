from django.shortcuts import render
from rest_framework.response import Response 
from rest_framework.views import APIView 
from .models import Area
from .serializers import AreaSerializer, ServiceSerializer
from rest_framework.permissions import IsAuthenticated 
from providers.views import IsProvider
from rest_framework.exceptions import AuthenticationFailed
from . models import Service, ServiceType

class GetAreas(APIView): 
    def get(self, request): 
        area_objs = Area.objects.all().order_by('village') 
        area_dict = AreaSerializer(area_objs, many=True)

        response_data = {
            'areas': area_dict.data, 
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
        # Service.objects.create(
        #     user=user, 
        #     business_name=business_name, 
        #     service_type=servie_type, 
        #     description=description, 
        #     cover_image=image
        # ) 
        # user.is_provider = True
        user.save()
        return Response('created')