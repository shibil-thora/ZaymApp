from django.shortcuts import render
from rest_framework.permissions import BasePermission 
from rest_framework.views import APIView
from rest_framework.response import Response
from services.serializers import ServiceSerializer


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