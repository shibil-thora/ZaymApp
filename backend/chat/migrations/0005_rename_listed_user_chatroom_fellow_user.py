# Generated by Django 5.0.6 on 2024-05-26 15:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0004_chatroom_delete_listedchat'),
    ]

    operations = [
        migrations.RenameField(
            model_name='chatroom',
            old_name='listed_user',
            new_name='fellow_user',
        ),
    ]
