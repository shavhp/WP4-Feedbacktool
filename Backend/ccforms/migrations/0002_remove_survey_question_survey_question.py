# Generated by Django 4.0.10 on 2023-05-12 10:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ccforms', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='survey',
            name='question',
        ),
        migrations.AddField(
            model_name='survey',
            name='question',
            field=models.ManyToManyField(to='ccforms.question', verbose_name='Vragen'),
        ),
    ]
