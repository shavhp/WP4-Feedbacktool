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
from ccforms import views
from ccforms.views import LoginView, SurveyDetailView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/questions/', views.question_list),
    path('api/mc_options/', views.multiple_choice_list),
    path('api/currentUser/', views.current_user),
    path('api/surveys/', views.survey_list),
    path('api/surveys/<int:survey_id>/', views.survey_detail),
    path('api/register/', views.register),
    path('api/login/', LoginView.as_view()),
    path('api/survey/<int:pk>/', SurveyDetailView.as_view(), name='survey-detail'),
    path('api/users/', views.user_list),
    path('api/users/<int:pk>/deactivate/', views.deactivate_user),
]
