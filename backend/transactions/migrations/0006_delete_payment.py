# Generated by Django 4.2.2 on 2023-06-21 07:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('transactions', '0005_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Payment',
        ),
    ]
