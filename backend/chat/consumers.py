import json 
from channels.generic.websocket import AsyncWebsocketConsumer
from rest_framework_simplejwt.tokens import AccessToken


class ChatConsumer(AsyncWebsocketConsumer): 
    async def connect(self): 
        scope = str(self.scope['query_string'])
        f, t = scope.split('&')
        fellow_user_id = f[4:] 
        token = t[2:-1]   
        decoded_token = AccessToken(token) 
        user_id = decoded_token['user_id']  
        id_list = sorted([str(user_id), str(fellow_user_id)]) 
        room_name = "room" + "".join(id_list) 
        print(room_name, 'room_name is printed here')
        self.chat_box_name = room_name
        self.group_name = f'chat_{self.chat_box_name}'

        await self.channel_layer.group_add(self.group_name, self.channel_name) 
        await self.accept() 

    async def disconnect(self, close_code): 
        await self.channel_layer.group_discard(self.group_name, self.channel_name) 

    async def receive(self, text_data): 
        text_data_json = json.loads(text_data) 
        # this is the place where we get the data sent from the frontend 
        message = text_data_json["message"] 
        sender_id = text_data_json["sender_id"]

        await self.channel_layer.group_send(
            self.group_name, 
            {
                'type': 'chatbox_message', 
                'message': message, 
                'sender_id': sender_id
            },
        ) 

    async def chatbox_message(self, event): 
        message = event["message"]
        sender_id = event["sender_id"]

        await self.send(text_data=json.dumps({"message": message, "sender_id": sender_id}))
