# Generated by Django 4.2.2 on 2023-06-21 07:29

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('projects', '0005_initial'),
        ('transactions', '0007_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('applications', '0004_remove_employments_employment_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Application',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('freelancer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='projects.project')),
            ],
        ),
        migrations.CreateModel(
            name='Employment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('employment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='applications.application')),
                ('payment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='transactions.payment')),
            ],
        ),
    ]
