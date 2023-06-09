from django.http import JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer, OpenQSerializer, MultipleChoiceQSerializer, SurveySerializer
from .models import OpenQ, MultipleChoiceQ, Survey, Response
from django.contrib.auth.decorators import login_required
from customUser.models import CustomUser
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from rest_framework.generics import RetrieveAPIView


User = get_user_model()


# Create your views here.
class UserList(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer


# Code for the questions inspired by
# https://blog.logrocket.com/using-react-django-create-app-tutorial/
@api_view(['GET', 'POST'])
def open_q_list(request):
    if request.method == 'GET':
        data = OpenQ.objects.all()
        serializer = OpenQSerializer(
            data,
            context={'request': request},
            many=True
        )
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = OpenQSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def mc_q_list(request):
    if request.method == 'GET':
        data = MultipleChoiceQ.objects.all()
        serializer = MultipleChoiceQSerializer(
            data,
            context={'request': request},
            many=True
        )
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = MultipleChoiceQSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def open_q_detail(request, pk):
    try:
        open_q = OpenQ.objects.get(pk=pk)
    except OpenQ.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = OpenQSerializer(open_q,
                                     data=request.data,
                                     context={
                                         'request': request},
                                     )
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def mc_q_detail(request, pk):
    try:
        mc_q = MultipleChoiceQ.objects.get(pk=pk)
    except MultipleChoiceQ.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = MultipleChoiceQSerializer(mc_q,
                                               data=request.data,
                                               context={
                                                   'request': request},
                                               )
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
def hide_open_q(request, pk):
    try:
        open_q_row = OpenQ.objects.get(question_id=pk)
        open_q_row.is_hidden = True
        open_q_row.save()
        return JsonResponse({
            'success': True
        })
    except OpenQ.DoesNotExist:
        return JsonResponse({
            'success': False,
            'error': 'Vraag bestaat niet.'
        })


@csrf_exempt
def hide_mc_q(request, pk):
    try:
        mc_q_row = MultipleChoiceQ.objects.get(mc_id=pk)
        mc_q_row.is_hidden = True
        mc_q_row.save()
        return JsonResponse({
            'success': True
        })
    except MultipleChoiceQ.DoesNotExist:
        return JsonResponse({
            'success': False,
            'error': 'Vraag bestaat niet.'
        })


@csrf_exempt
def edit_open_q(request, pk):
    try:
        open_q_row = OpenQ.objects.get(question_id=pk)
        serializer = OpenQSerializer(open_q_row, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({
                'success': True})
        return JsonResponse({
            'success': False,
            'error': serializer.errors})
    except OpenQ.DoesNotExist:
        return JsonResponse({
            'success': False,
            'error': 'Vraag bestaat niet.'
        })
    

@login_required
def current_user(request):
    print(request.user.role)
    return JsonResponse({'username': request.user.username})


@api_view(['GET', 'POST'])
def survey_list(request):
    if request.method == 'GET':
        surveys = Survey.objects.all()
        serializer = SurveySerializer(surveys, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = SurveySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def survey_detail(request, pk):
    try:
        survey = Survey.objects.get(pk=pk)
    except Survey.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        survey.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class LoginView(APIView):
    def post(self, request, format=None):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            role = user.role
            return Response({'success': True, 'success': username, 'success': role})
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


class SurveyDetailView(RetrieveAPIView):
    queryset = Survey.objects.all()
    serializer_class = SurveySerializer


# Counts all instances from OpenQ, McQ, Survey and Response models
# to display them on the dashboard on the homepage
# Source:
# https://stackoverflow.com/questions/61350232/counting-number-of-records-in-database-django
def count_open_q(request):
    all_open_q = OpenQ.objects.count()
    all_mc_q = MultipleChoiceQ.objects.count()
    all_surveys = Survey.objects.count()
    all_responses = Response.objects.count()

    data = {
        'all_open_q': all_open_q,
        'all_mc_q': all_mc_q,
        'all_surveys': all_surveys,
        'all_responses': all_responses
    }

    return JsonResponse(data)
