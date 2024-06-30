# Generated by Django 5.0.6 on 2024-06-30 06:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_myusers_is_premium'),
    ]

    operations = [
        migrations.CreateModel(
            name='MemberShip',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('number_of_days', models.IntegerField()),
                ('charge', models.IntegerField()),
            ],
        ),
        migrations.AddField(
            model_name='myusers',
            name='next_premium_deadline',
            field=models.DateTimeField(null=True),
        ),
    ]
