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
    path('api/open_questions/', views.open_q_list),
    path('api/mc_questions/', views.mc_q_list),
    path('api/currentUser/', views.current_user),
    path('api/open_questions/<int:pk>/hide/', views.hide_open_q),
    path('api/mc_questions/<int:pk>/hide/', views.hide_mc_q),
    path('api/surveys/', views.survey_list),
]
