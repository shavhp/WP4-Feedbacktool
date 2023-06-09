
from django.contrib import admin
from django.urls import path
from ccforms import views
from ccforms.views import LoginView, SurveyDetailView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', UserList.as_view()),
    path('api/questions/', views.question_list),
    path('api/mc_options/', views.multiple_choice_list),
    path('api/currentUser/', views.current_user),
    path('api/open_questions/', views.open_q_list),
    path('api/open_questions/<int:pk>/hide/', views.hide_open_q),
    path('api/open_questions/<int:pk>/edit/', views.edit_open_q),
    path('api/mc_questions/', views.mc_q_list),
    path('api/mc_questions/<int:pk>/hide/', views.hide_mc_q),
    path('api/surveys/', views.survey_list),
    path('api/surveys/<int:pk>/', views.survey_detail),
    path('api/surveys/<int:survey_id>/', views.survey_detail),
    path('api/register/', views.register),
    path('api/login/', LoginView.as_view()),
    path('api/survey/<int:pk>/', SurveyDetailView.as_view(), name='survey-detail'),
]
