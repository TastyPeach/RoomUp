from django.urls import path, include
from app_basic import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.app_login),
    path('register', views.app_register),
    path('logout', views.app_logout),
]
