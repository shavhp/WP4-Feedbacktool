from django.contrib.auth.models import User
from rest_framework import serializers
from .models import OpenQ, MultipleChoiceQ


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
