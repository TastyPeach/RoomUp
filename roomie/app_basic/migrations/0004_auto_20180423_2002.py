# Generated by Django 2.0.2 on 2018-04-23 20:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_basic', '0003_auto_20180419_0604'),
    ]

    operations = [
        migrations.AlterField(
            model_name='advanceduser',
            name='ethinicity',
            field=models.CharField(max_length=15, null=True),
        ),
        migrations.AlterField(
            model_name='advanceduser',
            name='note',
            field=models.TextField(null=True),
        ),
    ]
