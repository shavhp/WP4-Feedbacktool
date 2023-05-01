from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from django.urls import reverse_lazy
from .models import OpenQuestion, McQuestion
from django_tables2 import SingleTableView, LazyPaginator, RequestConfig
from .tables import OpenQuestionTable, McQuestionTable
from .forms import AddMcQuestionForm
from django.views.generic import CreateView


# Create your views here.
class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class OpenQuestionTableView(SingleTableView):
    model = OpenQuestion
    table_class = OpenQuestionTable
    template_name = "questions/open_questions_view.html"
    paginator_class = LazyPaginator


class McQuestionTableView(SingleTableView):
    model = McQuestion
    table_class = McQuestionTable
    template_name = "questions/mc_questions_view.html"
    paginator_class = LazyPaginator


class AddMcQuestionView(CreateView):
    form_class = AddMcQuestionForm
    success_url = reverse_lazy("mc_questions")
    template_name = "questions/add_mcquestion.html"
