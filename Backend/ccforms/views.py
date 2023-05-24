from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer, QuestionSerializer, MultipleChoiceSerializer
from .models import Question, MultipleChoice


# Create your views here.
class UserList(generics.ListAPIView):
    queryset = User.objects.all()
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


@csrf_exempt
def hide_question(request, pk):
    try:
        question_row = Question.objects.get(question_id=pk)
        question_row.is_hidden = True
        question_row.save()
        return JsonResponse({
            'success': True
        })
    except Question.DoesNotExist:
        return JsonResponse({
            'success': False,
            'error': 'Vraag bestaat niet.'
        })
