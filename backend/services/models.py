from django.db import models


class Area(models.Model): 
    state = models.CharField(max_length=100)
    dist = models.CharField(max_length=100)
    sub_dist = models.CharField(max_length=100)
    village = models.CharField(max_length=100) 
    area_name = models.CharField(max_length=200)

    def __str__(self): 
        return self.area_name