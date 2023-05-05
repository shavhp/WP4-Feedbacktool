# import django_tables2 as tables
# from .models import *
#
#
# class OpenQuestionTable(tables.Table):
#     archive = tables.TemplateColumn(template_name="questions/archive_open_question.html",
#                                     extra_context={"pk": tables.A('pk')},
#                                     verbose_name="",
#                                     )
#
#     class Meta:
#         model = OpenQuestion
#         fields = (
#             'open_question_id',
#             'question',
#             'is_archived',
#         )
#
#
# class McQuestionTable(tables.Table):
#     archive = tables.TemplateColumn(template_name="questions/archive_mc_question.html",
#                                     extra_context={"pk": tables.A('pk')},
#                                     verbose_name="",
#                                     )
#
#     class Meta:
#         model = McQuestion
#         fields = (
#             'mc_question_id',
#             'question',
#             'option_a',
#             'option_b',
#             'option_c',
#             'option_d',
#         )
