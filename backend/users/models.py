from django.db import models
from django.contrib.auth.models import AbstractUser  


class MemberShip(models.Model): 
    name = models.CharField(max_length=100) 
    number_of_days = models.IntegerField()  
    charge = models.IntegerField()  

    class Meta: 
        ordering = ['charge']

    def __str__(self): 
        return f'{self.name} - {self.charge}'



class MyUsers(AbstractUser): 
    is_provider = models.BooleanField(default=False)  
    is_premium = models.BooleanField(default=False) 
    next_premium_deadline = models.DateTimeField(null=True)
    profile_picture = models.ImageField(upload_to='profile_pics',)


class Notification(models.Model): 
    informer = models.ForeignKey(MyUsers, on_delete=models.CASCADE)
    receiver = models.ForeignKey(MyUsers, on_delete=models.CASCADE, related_name='notifications') 
    message = models.CharField(max_length=500)
    date = models.DateTimeField(auto_now_add=True) 

    @property 
    def informer_data(self): 
        return self.informer 
    
    def __str__(self): 
        return self.message