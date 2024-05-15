from django.shortcuts import render
from rest_framework.permissions import BasePermission 
from rest_framework.views import APIView
from rest_framework.response import Response


# provider permission 
class IsProvider(BasePermission): 
    def has_permission(self, request, view): 
        return request.user.is_provider 
    

class GetProvi(APIView): 
    permission_classes = [IsProvider]
    def get(self, request): 
        return Response('reached provider')