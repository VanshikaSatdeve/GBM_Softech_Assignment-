from django.shortcuts import render
from .models import Tasks
from .serializers import TaskSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import APIException
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication

#  A ViewSet for handling CRUD operations related to Holidays.
class TaskViewSet(ModelViewSet):
    queryset = Tasks.objects.all()
    serializer_class = TaskSerializer
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        """
        Returns the appropriate serializer class based on the action.
        """
        if self.action == 'list':
            return  TaskSerializer
        elif self.action == 'create':
            return TaskSerializer
        return self.serializer_class
    
    

    def list(self, request):
        """
        Retrieve a list of all tasks.
        """
        try:
            task_objs = Tasks.objects.all()  # Corrected this line
            serializer = self.get_serializer(task_objs, many=True)

            return Response({
                'status': status.HTTP_200_OK,
                'data': serializer.data
            })

        except Exception as e:
            print(e)
            raise APIException({
                'message': APIException.default_detail,
                'status': APIException.status_code
            })
        

    def create(self, request):
        """
        Create a new task list.
        """
        try:
            serializer = self.get_serializer(data=request.data)

            if not serializer.is_valid():
                print(serializer.errors)
                return Response({
                    'status': status.HTTP_400_BAD_REQUEST,
                    'data': serializer.errors,
                    'message': 'Invalid data'
                })
            serializer.save()

            return Response({
                'status': status.HTTP_201_CREATED,
                'data': serializer.data,
                'message': 'Task added successfully'
            })

        except Exception as e:
            print(e)
            raise APIException({
                'message': APIException.default_detail,
                'status': APIException.status_code
            })

    def retrieve(self, request, pk=None):
        """
        Retrieve details of a specific task.
        """
        try:
            id = pk
            if id is not None:
                task_objs = self.get_object()
                serializer = self.get_serializer(task_objs)

            return Response({
                'status': status.HTTP_200_OK,
                'data': serializer.data
            })

        except Exception as e:
            print(e)
            raise APIException({
                'message': APIException.default_detail,
                'status': APIException.status_code
            })

    def update(self, request, pk=None):
        """
        Update all fields of a specific taks.
        """
        try:
            task_objs = self.get_object()
            serializer = self.get_serializer(task_objs, data=request.data, partial=False)

            if not serializer.is_valid():
                print(serializer.errors)
                return Response({
                    'status': status.HTTP_400_BAD_REQUEST,
                    'data': serializer.errors,
                    'message': 'Invalid data'
                })
            serializer.save()

            return Response({
                'status': status.HTTP_200_OK,
                'data': serializer.data,
                'message': 'Task updated successfully'
            })

        except Exception as e:
            print(e)
            raise APIException({
                'message': APIException.default_detail,
                'status': APIException.status_code
            })
        
    def partial_update(self, request, pk=None):
        """
        Partially update specific fields of an task.
        """
        try:
            task_objs = self.get_object()
            serializer = self.get_serializer(task_objs, data=request.data, partial=True)

            if not serializer.is_valid():
                print(serializer.errors)
                return Response({
                    'status': status.HTTP_400_BAD_REQUEST,
                    'data': serializer.errors,
                    'message': 'Invalid data'
                })
            serializer.save()

            return Response({
                'status': status.HTTP_200_OK,
                'data': serializer.data,
                'message': 'Task updated successfully'
            })

        except Exception as e:
            print(e)
            raise APIException({
                'message': APIException.default_detail,
                'status': APIException.status_code
            })

    def destroy(self, request, pk):
        """
        Delete a specific task.
        """
        try:
            id = pk
            task_objs = self.get_object()
            task_objs.delete()
            return Response({
                'status': status.HTTP_200_OK,
                'message': 'Task deleted successfully'
            })

        except Exception as e:
            print(e)
            raise APIException({
                'message': APIException.default_detail,
                'status': APIException.status_code
            })

