from django.db import models
from django.contrib.auth.models import AbstractUser 


class MyUsers(AbstractUser): 
    is_provider = models.BooleanField(default=False)  
    profile_picture = models.ImageField(upload_to='profile_pics',)


