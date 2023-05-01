from django.shortcuts import render
from .models import OpenQuestion, McQuestion
from django_tables2 import SingleTableView, LazyPaginator
from .tables import OpenQuestionTable, McQuestionTable


# Create your views here.
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
