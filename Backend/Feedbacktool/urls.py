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
from ccforms.views import UserList
from ccforms import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', UserList.as_view()),
    path('api/questions/', views.question_list),
    path('api/mc_options/', views.multiple_choice_list),
    path('api/questions/<int:pk>/hide/', views.hide_question),
]
