from django.db import models
from users.models import MyUsers as User
from users.serializers import UserSerializer


class Area(models.Model): 
    state = models.CharField(max_length=100)
    dist = models.CharField(max_length=100)
    sub_dist = models.CharField(max_length=100)
    village = models.CharField(max_length=100) 
    area_name = models.CharField(max_length=200)
    permit = models.BooleanField(default=True)

    def __str__(self): 
        return self.area_name 
    

class ServiceType(models.Model): 
    is_hidden = models.BooleanField(default=False)
    service_name = models.CharField(max_length=100)

    def __str__(self): 
        return self.service_name
    

class Service(models.Model): 
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='services')
    business_name = models.CharField(max_length=100) 
    service_type = models.CharField(max_length=100)
    available = models.BooleanField(default=False) 
    permit = models.BooleanField(default=False)
    description = models.TextField(max_length=500, null=True) 
    cover_image = models.ImageField(upload_to='covers', null=True)

    def get_user(self): 
        user_obj =  User.objects.get(id=self.user.id)
        return user_obj 
    
    @property
    def get_areas(self): 
        area_objs = self.areas.all()
        return area_objs


    def __str__(self): 
        return self.business_name


class ServiceAreas(models.Model): 
    area = models.ForeignKey('Area', on_delete=models.CASCADE, related_name='services' ,null=True)
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='areas')  

    def __str__(self): 
        return self.service.business_name 
    
    @property
    def area_data(self): 
        return Area.objects.get(id=self.area.id)
    
    
        


class UserArea(models.Model): 
    user = models.OneToOneField(User, on_delete=models.RESTRICT, related_name='area') 
    area = models.ForeignKey('Area', on_delete=models.RESTRICT, related_name='users')


   