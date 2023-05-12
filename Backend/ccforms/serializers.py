from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Question, MultipleChoice


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = (
            'question_id',
            'question_text',
            'question_type',
            'is_hidden',
        )


class MultipleChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = MultipleChoice
        fields = (
            'mc_id',
            'question',
            'option_a',
            'option_b',
            'option_c',
            'option_d',
            'is_hidden',
        )
