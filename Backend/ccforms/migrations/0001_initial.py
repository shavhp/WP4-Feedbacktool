# Generated by Django 4.0.9 on 2023-06-02 08:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Administrator',
            fields=[
                ('admin_id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=250, verbose_name='E-mailadres')),
                ('last_name', models.CharField(max_length=250, verbose_name='Achternaam')),
                ('first_name', models.CharField(max_length=250, verbose_name='Voornaam')),
                ('is_admin', models.BooleanField(default=True, verbose_name='Is administrator')),
            ],
        ),
        migrations.CreateModel(
            name='MultipleChoice',
            fields=[
                ('mc_id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID')),
                ('option_a', models.CharField(max_length=250, verbose_name='A')),
                ('option_b', models.CharField(max_length=250, verbose_name='B')),
                ('option_c', models.CharField(blank=True, default='', max_length=250, verbose_name='C')),
                ('option_d', models.CharField(blank=True, default='', max_length=250, verbose_name='D')),
                ('is_hidden', models.BooleanField(default=False, verbose_name='Verborgen')),
            ],
            options={
                'verbose_name': 'Meerkeuzeoptie',
                'verbose_name_plural': 'Meerkeuzeopties',
            },
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('question_id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID')),
                ('question_text', models.CharField(max_length=250, verbose_name='Vraag')),
                ('question_type', models.CharField(choices=[('OPEN', 'Open'), ('MC', 'Meerkeuze')], default='', max_length=4)),
                ('is_hidden', models.BooleanField(default=False, verbose_name='Verborgen')),
            ],
            options={
                'verbose_name': 'Vraag',
                'verbose_name_plural': 'Vragen',
            },
        ),
        migrations.CreateModel(
            name='TeamMember',
            fields=[
                ('team_member_id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=250, verbose_name='E-mailadres')),
                ('last_name', models.CharField(max_length=250, verbose_name='Achternaam')),
                ('first_name', models.CharField(max_length=250, verbose_name='Voornaam')),
                ('is_admin', models.BooleanField(default=False, verbose_name='Is administrator')),
            ],
            options={
                'verbose_name': 'Teamlid',
                'verbose_name_plural': 'Teamleden',
            },
        ),
        migrations.CreateModel(
            name='Survey',
            fields=[
                ('survey_id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, verbose_name='Naam enquête')),
                ('description', models.CharField(blank=True, default='', max_length=500, verbose_name='Toelichting')),
                ('is_anonymous', models.BooleanField(default=False, verbose_name='Anonieme respons')),
                ('date_sent', models.DateField(null=True, verbose_name='Verzonden op')),
                ('url', models.URLField(default='', unique=True)),
                ('admin', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='ccforms.administrator', verbose_name='Administrator')),
                ('multiple_choice', models.ManyToManyField(to='ccforms.multiplechoice', verbose_name='Meerkeuzevragen')),
                ('questions', models.ManyToManyField(to='ccforms.question', verbose_name='Open vragen')),
            ],
        ),
        migrations.CreateModel(
            name='Response',
            fields=[
                ('response_id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID')),
                ('date_submitted', models.DateField(null=True, verbose_name='Ingevuld op')),
                ('answers', models.ManyToManyField(to='ccforms.question', verbose_name='Antwoorden')),
                ('multiple_choice', models.ManyToManyField(to='ccforms.multiplechoice', verbose_name='Meerkeuzeopties')),
                ('survey', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='ccforms.survey', verbose_name='Naam enquête')),
                ('tm_email', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='ccforms.teammember', verbose_name='E-mailadres teamlid')),
            ],
        ),
        migrations.AddField(
            model_name='multiplechoice',
            name='question',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.PROTECT, to='ccforms.question', verbose_name='Vraag'),
        ),
    ]
