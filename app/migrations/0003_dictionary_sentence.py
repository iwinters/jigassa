# Generated by Django 3.1.7 on 2021-05-09 18:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_auto_20210328_1122'),
    ]

    operations = [
        migrations.AddField(
            model_name='dictionary',
            name='sentence',
            field=models.CharField(default='Keep up the great work!', max_length=280),
        ),
    ]
