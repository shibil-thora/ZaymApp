from django.shortcuts import render
from rest_framework.views import APIView 
from rest_framework.response import Response 
from rest_framework.permissions import IsAuthenticated
from .serializers import MessageSerializer, Message, ChatRoomSerializer, ChatRoom
from django.db.models import Q , Count
from users.models import MyUsers as User



class GetAvailableChats(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request): 
        user = request.user 
        chat_list_objs = user.chat_room.all() 
        chat_list = ChatRoomSerializer(chat_list_objs, many=True).data
        return Response(chat_list)