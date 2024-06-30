from django.contrib import admin
from .models import MyUsers, Notification, MemberShip

admin.site.register(MyUsers)
admin.site.register(Notification)  
admin.site.register(MemberShip)
