# Generated by Django 4.2.2 on 2023-06-20 17:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('applications', '0002_remove_employments_employment_and_more'),
        ('projects', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='required_skills',
            name='project',
        ),
        migrations.RemoveField(
            model_name='required_skills',
            name='skill',
        ),
        migrations.DeleteModel(
            name='Projects',
        ),
        migrations.DeleteModel(
            name='Required_Skills',
        ),
    ]
