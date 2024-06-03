# Generated by Django 5.0.6 on 2024-06-03 19:10

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0015_serviceimages'),
    ]

    operations = [
        migrations.AlterField(
            model_name='serviceimages',
            name='service',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='services.service'),
        ),
    ]