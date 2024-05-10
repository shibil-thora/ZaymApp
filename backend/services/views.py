from django.shortcuts import render
from rest_framework.response import Response 
from rest_framework.views import APIView 
from .models import Area

class SetService(APIView): 
    def post(self, request): 
        return Response({'message': 'success'})