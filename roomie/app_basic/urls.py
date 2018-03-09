from django.urls import path, include
from app_basic import views

urlpatterns = [
    path('', views.index, name='index'),
]
