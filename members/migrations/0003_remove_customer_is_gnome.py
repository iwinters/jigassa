# Generated by Django 3.1.7 on 2022-06-11 19:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('members', '0002_customer_is_gnome'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customer',
            name='is_gnome',
        ),
    ]