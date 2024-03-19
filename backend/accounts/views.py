from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from .models import UserAccountTasks


class GetFirstNameAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            first_name = request.user.first_name
            return Response({'first_name': first_name}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetEmailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            email = request.user.email
            return Response({'email': email}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class TasksAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            tasks = UserAccountTasks.objects.filter(email=request.user.email)

            task_data = [
                {
                    'task_id': task.task_id,
                    'task_title': task.task_title,
                    'task_due_date': task.task_due_date.strftime('%d-%m-%Y'),
                    'task_type': task.task_type,
                }
                for task in tasks
            ]
            return Response(task_data)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
class AddTaskAPIView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data

        email = data.get('email')
        task_title = data.get('task_title')
        task_type = data.get('task_type')

        if not email or not task_title or not task_type:
            return Response({'error': 'Incomplete data provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            task = UserAccountTasks.objects.create(
                email=email,
                task_title=task_title,
                task_type=task_type,
            )
            return Response({'success': 'Task added successfully' + str(task)})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
