from rest_framework import serializers
from .models import Tasks

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields=['id', 'title', 'description', 'deu_date', 'status', 'details']
        read_only_fields = ['id']

