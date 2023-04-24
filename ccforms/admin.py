from django.contrib import admin
from .models import *


# Register your models here.
class McQuestionAdmin(admin.ModelAdmin):
    list_display = (
        "mc_question_id",
        "question",
        "option_a",
        "option_b",
        "option_c",
        "option_d",
        "is_archived",
    )


class OpenQuestionAdmin(admin.ModelAdmin):
    list_display = (
        "open_question_id",
        "question",
        "is_archived",
    )


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
        "open_question",
        "mc_question",
        "url",
    )


class ResponseAdmin(admin.ModelAdmin):
    list_display = (
        "response_id",
        "survey",
        "tm_email",
        "open_question",
        "mc_question",
        "date_submitted",
    )


admin.site.register(McQuestion, McQuestionAdmin)
admin.site.register(OpenQuestion, OpenQuestionAdmin)
admin.site.register(Administrator, AdministratorAdmin)
admin.site.register(TeamMember, TeamMemberAdmin)
admin.site.register(Survey, SurveyAdmin)
admin.site.register(Response, ResponseAdmin)
