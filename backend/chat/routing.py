import django  
import os 

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()


from django.urls import re_path 
from . import consumers 


websocket_urlpatterns = [
    re_path(r'chat/room/', consumers.ChatConsumer.as_asgi()), 
    re_path(r'live/room/', consumers.RealTimeConsumer.as_asgi()), 
]