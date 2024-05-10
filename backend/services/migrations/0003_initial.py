# Generated by Django 5.0.6 on 2024-05-08 18:37

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('services', '0002_delete_area'),
    ]

    operations = [
        migrations.CreateModel(
            name='Area',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('state', models.CharField(max_length=100)),
                ('dist', models.CharField(max_length=100)),
                ('sub_dist', models.CharField(max_length=100)),
                ('village', models.CharField(max_length=100)),
                ('area_string', models.CharField(max_length=200)),
            ],
        ),
    ]
