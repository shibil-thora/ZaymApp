from django.shortcuts import render
from rest_framework.permissions import BasePermission , IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from services.serializers import ServiceSerializer
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
        service_id = request.data['service_id'] 
        service = Service.objects.get(id=service_id)
        area_obj = Area.objects.get(area_name=request.data['area_name']) 
        ServiceAreas.objects.create(area=area_obj, service=service)
        print(Service.objects.get(id=request.data['service_id']), Area.objects.get(area_name=request.data['area_name']))
        return Response({'id': area_obj.id})
    

class DeleteServiceArea(APIView):
    permission_classes = [IsProvider] 
    def post(self, request): 
        area = ServiceAreas.objects.filter(area__id=request.data['area_id']).delete()
        return Response(request.data)