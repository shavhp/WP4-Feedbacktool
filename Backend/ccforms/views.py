from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer, QuestionSerializer, MultipleChoiceSerializer, SurveySerializer
from .models import Question, MultipleChoice, Survey
from django.contrib.auth.decorators import login_required
from authCustomUser.models import CustomUser

# Create your views here.
class UserList(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer


# Code from
# https://blog.logrocket.com/using-react-django-create-app-tutorial/
@api_view(['GET', 'POST'])
def question_list(request):
    if request.method == 'GET':
        data = Question.objects.all()
        serializer = QuestionSerializer(
            data,
            context={'request': request},
            many=True
        )
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def multiple_choice_list(request):
    if request.method == 'GET':
        data = MultipleChoice.objects.all()
        serializer = MultipleChoiceSerializer(
            data,
            context={'request': request},
            many=True
        )
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = MultipleChoiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)

@login_required
def current_user(request):
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
            print(serializer.errors)  # Print validation errors to console
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


