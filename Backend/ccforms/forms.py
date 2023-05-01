from django import forms
from .models import OpenQuestion, McQuestion


class AddMcQuestionForm(forms.ModelForm):
    class Meta:
        model = McQuestion
        fields = (
            "question",
            "option_a",
            "option_b",
            "option_c",
            "option_d",
        )
