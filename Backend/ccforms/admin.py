from django.contrib import admin
from .models import *


class QuestionAdmin(admin.ModelAdmin):
    list_display = (
        "question_id",
        "question_text",
        "question_type",
        "is_hidden",
    )


class MultipleChoiceAdmin(admin.ModelAdmin):
    list_display = (
        "mc_id",
        "question",
        "option_a",
        "option_b",
        "option_c",
        "option_d",
        "is_hidden",
    )

    # Only display multiple-choice questions from Question table
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "question":
            kwargs["queryset"] = Question.objects.filter(question_type=Question.MULTIPLE_CHOICE)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


class AdministratorAdmin(admin.ModelAdmin):
    list_display = (
        "admin_id",
        "email",
        "last_name",
        "first_name",
        "is_admin",
    )


class TeamMemberAdmin(admin.ModelAdmin):
    list_display = (
        "team_member_id",
        "email",
        "last_name",
        "first_name",
        "is_admin",
    )


class SurveyAdmin(admin.ModelAdmin):
    list_display = (
        "survey_id",
        "admin",
        "title",
        "description",
        "is_anonymous",
        "date_sent",
        "get_questions",
        "get_multiple_choice",
        "url",
    )

    # Display only selected open questions in database, in a string
    def get_questions(self, obj):
        open_questions = obj.questions.filter(question_type=Question.OPEN)
        return ", ".join([q.question_text for q in open_questions])
    get_questions.short_description = "Open vragen"

    # Display only selected multiple choice questions in database, in a string
    def get_multiple_choice(self, obj):
        questions = obj.multiple_choice.all()
        return ", ".join([q.question.question_text for q in questions])
    get_multiple_choice.short_description = "Meerkeuzevragen"


class ResponseAdmin(admin.ModelAdmin):
    list_display = (
        "response_id",
        "survey",
        "tm_email",
        "get_answers",
        "date_submitted",
    )

    def get_answers(self, obj):
        return ", ".join([q.question_text for q in obj.answers.all()])
    get_answers.short_description = "Questions"


admin.site.register(Question, QuestionAdmin)
admin.site.register(MultipleChoice, MultipleChoiceAdmin)
admin.site.register(Administrator, AdministratorAdmin)
admin.site.register(TeamMember, TeamMemberAdmin)
admin.site.register(Survey, SurveyAdmin)
admin.site.register(Response, ResponseAdmin)
