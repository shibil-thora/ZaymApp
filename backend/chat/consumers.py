import json 
from asgiref.sync import async_to_sync 
from channels.generic.websocket import WebsocketConsumer 
from rest_framework_simplejwt.tokens import AccessToken
from users.models import MyUsers as User
from chat.models import ChatRoom
from chat.models import Message
from rest_framework.exceptions import AuthenticationFailed 
from django.core.cache import cache


class ChatConsumer(WebsocketConsumer): 
    def connect(self):
        self.room_name = 'room' 
        self.room_group_name = self.room_name  
        self.user_id = None
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        ) 
        query = str(self.scope['query_string']) 
        f, t = query.split('&')
        fellow_user_id = f[4:]
        if fellow_user_id != 'undefined': 
            self.fellow_user_id = fellow_user_id
        token = t[2:-1]  
        decoded_token = AccessToken(token)
        user_id = decoded_token['user_id']  
        self.user_id = user_id
        self.accept() 

    def disconnet(self, code): 
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    def receive(self, text_data): 
        json_text = json.loads(text_data) 
        message = json_text['message'] 
        
        #logic to create the message in the database 
        user_id = json_text['user']
        fellow_user_id = json_text['fellow']
        cache.set(user_id, fellow_user_id)
        room1_id = json_text['room_id']
        # user = User.objects.get(id=user_id)
        # fellow_user = User.objects.get(id=fellow_user_id)
        # room1 = ChatRoom.objects.get(id=room1_id)
        # room2 = ChatRoom.objects.get(user=fellow_user, fellow_user=user)
        # Message.objects.create(
        #     sender=user, 
        #     receiver=fellow_user, 
        #     message=message, 
        #     is_read=False, 
        #     room1=room1, 
        #     room2=room2
        # )

        ####

        #send message to the room group 
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, 
            {
                'type': 'chat_message', 
                'message': message,  
            }
        )

    def chat_message(self, event): 
        message = event['message'] 
        fellow_user_id = cache.get(self.user_id)
        fellow = None
        try: 
            fellow = User.objects.get(id=fellow_user_id) 
            self.send(text_data=json.dumps({'message': message, 'fellow': fellow.username if fellow else 'none'}))
            print('here without error')
        except: 
            pass
        print(fellow, 'fellow user printed')
        #send message to websocket 
        
