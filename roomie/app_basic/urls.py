from django.urls import re_path, path, include
from app_basic import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.app_login),
    path('register', views.app_register),
    path('logout', views.app_logout),
    path('get_apt_by_id', views.get_apt_by_id),
    path('become_advance', views.become_advance),
    path('get_personal_info', views.get_personal_info),
    path('get_user_info', views.get_user_info),
    path('add_potential_match', views.add_potential_match),
    path('get_potential_match', views.get_potential_match),
    path('delete_potential_match', views.delete_potential_match),
    path('filter_group', views.filter_group),
    path('create_group', views.create_group),
    path('add_to_group', views.add_to_group),
    path('leave_from_group', views.leave_from_group),
    path('get_group_info', views.get_group_info),

    # re_path(r'^new/$', views.new_room, name='new_room'),
    # re_path(r'^(?P<label>[\w-]{,50})/$', views.chat_room, name='chat_room'),
    path('<int:label>/chat_room/', views.chat_room, name='chat_room')
]
