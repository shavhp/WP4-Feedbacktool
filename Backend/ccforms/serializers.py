from django.contrib.auth.models import User
from rest_framework import serializers
from .models import OpenQ, MultipleChoiceQ, Survey


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')


# Question serializers inspired by
# https://blog.logrocket.com/using-react-django-create-app-tutorial/
class OpenQSerializer(serializers.ModelSerializer):
    is_hidden = serializers.BooleanField()

    class Meta:
        model = OpenQ
        fields = (
            'question_id',
            'question_text',
            'is_hidden',
        )


class MultipleChoiceQSerializer(serializers.ModelSerializer):
    class Meta:
        model = MultipleChoiceQ
        fields = (
            'mc_id',
            'question_text',
            'option_a',
            'option_b',
            'option_c',
            'option_d',
            'is_hidden',
        )


class SurveySerializer(serializers.ModelSerializer):
    questions = OpenQSerializer(many=True, read_only=True)
    multiple_choice = MultipleChoiceQSerializer(many=True, read_only=True)

    class Meta:
        model = Survey
        fields = (
            'survey_id',
            'admin',
            'title',
            'description',
            'is_anonymous',
            'date_sent',
            'questions',
            'multiple_choice',
            'url',
        )
