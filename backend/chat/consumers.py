import json 
from asgiref.sync import async_to_sync 
from channels.generic.websocket import WebsocketConsumer 
from rest_framework_simplejwt.tokens import AccessToken
from users.models import MyUsers as User
from chat.models import ChatRoom
from chat.models import Message


class ChatConsumer(WebsocketConsumer): 
    def connect(self):
        self.room_name = 'room' 
        self.room_group_name = self.room_name  
        self.fellow_username = None
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        ) 
        query = self.scope['query_string'] 
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
        room1_id = json_text['room_id']
        user = User.objects.get(id=user_id)
        fellow_user = User.objects.get(id=fellow_user_id)
        room1 = ChatRoom.objects.get(id=room1_id)
        room2 = ChatRoom.objects.get(user=fellow_user, fellow_user=user)
        print(room1, room2, message) 
        self.fellow_username = fellow_user.username
        Message.objects.create(
            sender=user, 
            receiver=fellow_user, 
            message=message, 
            is_read=False, 
            room1=room1, 
            room2=room2
        )

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
        #send message to websocket 
        self.send(text_data=json.dumps({'message': message, 'fellow': self.fellow_username}))
