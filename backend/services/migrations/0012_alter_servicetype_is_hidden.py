# Generated by Django 5.0.6 on 2024-05-16 18:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0011_servicetype_is_hidden'),
    ]

    operations = [
        migrations.AlterField(
            model_name='servicetype',
            name='is_hidden',
            field=models.BooleanField(default=False),
        ),
    ]
