from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.exceptions import ValidationError
from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver


class Question(models.Model):
    OPEN = "OPEN"
    MULTIPLE_CHOICE = "MC"

    QUESTION_TYPE_CHOICES = [
        (OPEN, "Open"),
        (MULTIPLE_CHOICE, "Meerkeuze"),
    ]

    question_id = models.AutoField(primary_key=True, verbose_name="Vraagnummer")
    question_text = models.CharField(verbose_name="Vraag", max_length=250)
    question_type = models.CharField(max_length=4, choices=QUESTION_TYPE_CHOICES, default="")
    is_hidden = models.BooleanField(default=False, verbose_name="Verborgen")

    class Meta:
        verbose_name = "Vraag"
        verbose_name_plural = "Vragen"

    def __str__(self):
        return self.question_text[:50]


@receiver(pre_save, sender=Question)
def validate_question_type(sender, instance, **kwargs):
    if instance.question_type == Question.OPEN and instance.multiplechoice_set.exists():
        raise ValidationError("Open vragen hebben geen meerkeuzeopties.")


class MultipleChoice(models.Model):
    mc_id = models.AutoField(primary_key=True, verbose_name="ID")
    question = models.ForeignKey(Question, on_delete=models.PROTECT, default="", verbose_name="Vraag")
    option_a = models.CharField(verbose_name="A", max_length=250)
    option_b = models.CharField(verbose_name="B", max_length=250)
    option_c = models.CharField(verbose_name="C", max_length=250, blank=True, default="")
    option_d = models.CharField(verbose_name="D", max_length=250, blank=True, default="")
    is_hidden = models.BooleanField(default=False, verbose_name="Verborgen")

    class Meta:
        verbose_name = "Vraagoptie"
        verbose_name_plural = "Vraagopties"

    # def __str__(self):
    #     return self.question_text[:50]


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
    # is_active = models.BooleanField(default=True, verbose_name="Is actief")
    is_admin = models.BooleanField(default=False, verbose_name="Is administrator")

    class Meta:
        verbose_name = "Teamlid"
        verbose_name_plural = "Teamleden"

    def __str__(self):
        return self.email


class Survey(models.Model):
    survey_id = models.AutoField(primary_key=True, verbose_name="Enquêtenummer")
    admin = models.ForeignKey(Administrator, on_delete=models.CASCADE, default="",
                              verbose_name="Administrator")
    title = models.CharField(max_length=100, verbose_name="Naam enquête")
    description = models.CharField(max_length=500, verbose_name="Toelichting", blank=True, default="")
    is_anonymous = models.BooleanField(default=False, verbose_name="Anonieme respons")
    date_sent = models.DateField(null=True, verbose_name="Verzonden op")
    question = models.ForeignKey(Question, on_delete=models.PROTECT, default="", verbose_name="Vragen")
    url = models.URLField(max_length=200, default="", unique=True)

    def __str__(self):
        return self.title


class Response(models.Model):
    response_id = models.AutoField(primary_key=True, verbose_name="Responsnummer")
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE, default="", verbose_name="Naam enquête")
    tm_email = models.ForeignKey(TeamMember, on_delete=models.CASCADE, default="", verbose_name="E-mailadres teamlid")
    question = models.ForeignKey(Question, on_delete=models.PROTECT, default="", verbose_name="Vragen")
    date_submitted = models.DateField(null=True, verbose_name="Ingevuld op")

    def __str__(self):
        return f'Reactie op "{self.survey.title}"'
