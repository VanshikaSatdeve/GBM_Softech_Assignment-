from django.db import models

# Create your models here.class Holidays(models.Model):
class Tasks(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    deu_date = models.DateField()
    status = models.CharField(max_length=120,default= False)
    details= models.CharField(max_length=1000)
    
    def __str__(self) :
        return self.name 
