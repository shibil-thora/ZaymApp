# Generated by Django 5.0.6 on 2024-05-11 14:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='myusers',
            name='profile_picture',
            field=models.ImageField(default='', upload_to='profile_pics'),
            preserve_default=False,
        ),
    ]
