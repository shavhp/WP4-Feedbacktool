"""Feedbacktool URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from ccforms.views import OpenQuestionTableView, McQuestionTableView, AddMcQuestionView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('open_questions/', OpenQuestionTableView.as_view(), name="open_questions"),
    path('mc_questions/', McQuestionTableView.as_view(), name="mc_questions"),
    path('add_mc_question/', AddMcQuestionView.as_view(), name="add_mc_question"),
]
