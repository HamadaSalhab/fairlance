# Generated by Django 4.2.2 on 2023-06-21 07:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('transactions', '0003_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Payments',
        ),
    ]
