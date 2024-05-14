from django.db import models
from users.models import MyUsers as User

class Area(models.Model): 
    state = models.CharField(max_length=100)
    dist = models.CharField(max_length=100)
    sub_dist = models.CharField(max_length=100)
    village = models.CharField(max_length=100) 
    area_name = models.CharField(max_length=200)

    def __str__(self): 
        return self.area_name 
    

class ServiceType(models.Model): 
    service_name = models.CharField(max_length=100)

    def __str__(self): 
        str(self.service_name)
    

class Service(models.Model): 
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='services')
    business_name = models.CharField(max_length=100) 
    service_type = models.ForeignKey('ServiceType', on_delete=models.CASCADE)
    available = models.BooleanField(default=False) 
    permit = models.BooleanField(default=False)
    description = models.TextField(max_length=500, null=True) 
    cover_image = models.ImageField(upload_to='covers', null=True)

    def __str__(self): 
        return self.business_name


class ServiceAreas(models.Model): 
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='areas')  


class UserArea(models.Model): 
    user = models.OneToOneField(User, on_delete=models.RESTRICT, related_name='area') 
    area = models.ForeignKey('Area', on_delete=models.RESTRICT, related_name='users')


   