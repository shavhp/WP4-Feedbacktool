
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
    path('api/surveys/<int:pk>/', views.survey_detail),
]
