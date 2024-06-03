from django.shortcuts import render
from rest_framework.permissions import BasePermission , IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from services.serializers import ServiceSerializer, ServiceAreaSerializer
from services.models import Service, Area, ServiceAreas


# provider permission 
class IsProvider(BasePermission): 
    def has_permission(self, request, view): 
        return request.user.is_provider 
    

class GetServices(APIView): 
    permission_classes = [IsProvider]
    def get(self, request): 
        service_objs = request.user.services.all()
        services = ServiceSerializer(service_objs, many=True).data
        return Response(services) 
    

class AddServiceArea(APIView):
    permission_classes = [IsProvider] 
    def post(self, request):  
        print(request.data) 
        service_id = request.data['service_id'] 
        service = Service.objects.get(id=service_id)
        area_obj = Area.objects.get(area_name=request.data['area_name']) 
        area = ServiceAreas.objects.create(area=area_obj, service=service)
        return Response(ServiceAreaSerializer(area).data)
    

class DeleteServiceArea(APIView):
    permission_classes = [IsProvider] 
    def post(self, request): 
        delete_id = request.data['area_id']['area_data']['id'] 
        print(delete_id)
        print(ServiceAreas.objects.filter(area__id=delete_id).delete())
        return Response(request.data)