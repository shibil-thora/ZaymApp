from django.shortcuts import render
from rest_framework.response import Response 
from rest_framework.views import APIView 
from .models import Area
from .serializers import AreaSerializer

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
