from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer, OpenQuestionSerializer, McQuestionSerializer
from .models import OpenQuestion, McQuestion
from django.contrib.auth import authenticate, login
from rest_framework.views import APIView
from authCustomUser.models import CustomUser
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your views here.
class UserList(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer


# Code from
# https://blog.logrocket.com/using-react-django-create-app-tutorial/
@api_view(['GET', 'POST'])
def mc_question_list(request):
    if request.method == 'GET':
        data = McQuestion.objects.all()
        serializer = McQuestionSerializer(
            data,
            context={'request': request},
            many=True
        )
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = McQuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def open_question_list(request):
    if request.method == 'GET':
        data = OpenQuestion.objects.all()
        serializer = OpenQuestionSerializer(
            data,
            context={'request': request},
            many=True
        )
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = OpenQuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class LoginView(APIView):
    def post(self, request, format=None):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            print(user)
            return Response({'success': True, 'success': username})
        else:
            return Response({'success': False, 'error': 'Invalid credentials'})
        
   
@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    role = request.data.get('role')

    if not username or not email or not password:
        return Response({'error': 'Please provide all required fields.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Check if a user with the same username or email already exists
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        # Create a new user
        user = User.objects.create_user(username=username, email=email, password=password, role=role)
        return Response({'success': 'User registered successfully.'}, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)