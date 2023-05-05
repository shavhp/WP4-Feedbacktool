from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer, OpenQuestionSerializer, McQuestionSerializer
from django.urls import reverse_lazy
from .models import OpenQuestion, McQuestion
from django_tables2 import SingleTableView, LazyPaginator, RequestConfig
# from .tables import OpenQuestionTable, McQuestionTable
from .forms import AddMcQuestionForm
from django.views.generic import CreateView


# Create your views here.
class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# class OpenQuestionTableView(SingleTableView):
#     model = OpenQuestion
#     table_class = OpenQuestionTable
#     template_name = "questions/open_questions_view.html"
#     paginator_class = LazyPaginator
#
#
# class McQuestionTableView(SingleTableView):
#     model = McQuestion
#     table_class = McQuestionTable
#     template_name = "questions/mc_questions_view.html"
#     paginator_class = LazyPaginator


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


# Code from
# https://blog.logrocket.com/using-react-django-create-app-tutorial/
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
        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)


class AddMcQuestionView(CreateView):
    form_class = AddMcQuestionForm
    success_url = reverse_lazy("mc_questions")
    template_name = "questions/add_mcquestion.html"
