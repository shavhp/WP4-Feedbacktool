from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
    

class McQuestion(models.Model):
    mc_question_id = models.AutoField(primary_key=True, verbose_name="Vraagnummer")
    question = models.CharField(verbose_name="Vragen", max_length=250)
    option_a = models.CharField(verbose_name="Optie A", max_length=250)
    option_b = models.CharField(verbose_name="Optie B", max_length=250)
    option_c = models.CharField(verbose_name="Optie C", max_length=250, null=True)
    option_d = models.CharField(verbose_name="Optie D", max_length=250, null=True)

    class Meta:
        verbose_name = "Multiple Choice Question"

    def __str__(self):
        return self.question[:50]


class OpenQuestion(models.Model):
    open_question_id = models.AutoField(primary_key=True, verbose_name="Vraagnummer")
    question = models.CharField(verbose_name="Vragen", max_length=250)

    def __str__(self):
        return self.question[:50]


class Administrator(models.Model):
    admin_id = models.AutoField(primary_key=True, verbose_name="Administratornummer")
    email = models.EmailField(max_length=250, verbose_name="E-mailadres")
    last_name = models.CharField(max_length=250, verbose_name="Achternaam")
    first_name = models.CharField(max_length=250, verbose_name="Voornaam")
    is_admin = models.BooleanField(default=True, verbose_name="Is administrator")

    def __str__(self):
        return f"{self.last_name}, {self.first_name}"


class TeamMember(models.Model):
    team_member_id = models.AutoField(primary_key=True, verbose_name="Teamlidnummer")
    email = models.EmailField(max_length=250, verbose_name="E-mailadres")
    last_name = models.CharField(max_length=250, verbose_name="Achternaam")
    first_name = models.CharField(max_length=250, verbose_name="Voornaam")
    is_admin = models.BooleanField(default=False, verbose_name="Is administrator")

    def __str__(self):
        return self.email


class Survey(models.Model):
    survey_id = models.AutoField(primary_key=True, verbose_name="Enquêtenummer")
    admin = models.ForeignKey(Administrator, on_delete=models.CASCADE, default="", verbose_name="Administrator")
    title = models.CharField(max_length=100, verbose_name="Naam enquête")
    description = models.CharField(max_length=500, verbose_name="Toelichting")
    is_anonymous = models.BooleanField(default=True, verbose_name="Anonieme respons")
    date_sent = models.DateField(null=True, verbose_name="Verzonden op")
    open_question = models.ForeignKey(OpenQuestion, on_delete=models.CASCADE, default="", verbose_name="Open vragen")
    mc_question = models.ForeignKey(McQuestion, on_delete=models.CASCADE, default="", verbose_name="Meerkeuzevragen")
    url = models.URLField(max_length=200, default="", unique=True)

    def __str__(self):
        return self.title


class Response(models.Model):
    response_id = models.AutoField(primary_key=True, verbose_name="Responsnummer")
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE, default="", verbose_name="Naam enquête")
    tm_email = models.ForeignKey(TeamMember, on_delete=models.CASCADE, default="", verbose_name="E-mailadres teamlid")
    open_question = models.ForeignKey(OpenQuestion, on_delete=models.CASCADE, default="", verbose_name="Open vragen")
    mc_question = models.ForeignKey(McQuestion, on_delete=models.CASCADE, default="", verbose_name="Meerkeuzevragen")
    response = models.CharField(max_length=500, verbose_name="Reacties")
    date_submitted = models.DateField(null=True, verbose_name="Ingevuld op")
