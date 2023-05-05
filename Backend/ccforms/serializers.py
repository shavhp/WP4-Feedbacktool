from django.contrib.auth.models import User
from rest_framework import serializers
from .models import OpenQuestion, McQuestion


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')


class OpenQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpenQuestion
        fields = (
            'open_question_id',
            'question',
            'is_archived',
        )


class McQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = McQuestion
        fields = (
            'mc_question_id',
            'question',
            'option_a',
            'option_b',
            'option_c',
            'option_d',
            'is_archived',
        )
