from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.db.utils import IntegrityError
from django.contrib.auth import logout, login, authenticate

from .models import *
from .serializers import *

from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, parser_classes, permission_classes

def index(request):
    my_dick = {'insert_me' : "Hello I am from views.py"}
    return render(request, 'app_basic/index.html', context=my_dick)

## ------------------------------- Authentication Related --------------------------
@api_view(['POST'])
@parser_classes((JSONParser,))
def app_login(request):
    uname = request.data.get('username')
    passwd = request.data.get('password')
    user = authenticate(username=uname, password=passwd)
    if user:
        login(request._request, user)
        
    else:
        return Response({"token": ""}, status=status.HTTP_403_FORBIDDEN)
    
    # generate token for client
    token, _ = Token.objects.get_or_create(user=user)
    r = JsonResponse({"token": token.key}, status=status.HTTP_202_ACCEPTED)
    # r.set_cookie(key="token", value=token.key)
    return r

@api_view(['POST'])
@parser_classes((JSONParser,))
def app_register(request):
    uname = request.data.get('username')
    passwd = request.data.get('password')
    print("this is register")
    try:
        u = User(username=uname, password=passwd)
        u.set_password(passwd)
        u.save()
        return Response(status=status.HTTP_201_CREATED)
    
    # user already exist in database
    except IntegrityError:
        return Response(status=status.HTTP_409_CONFLICT)

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def app_logout(request):
    logout(request._request)
    request.user.auth_token.delete()
    r = Response() 
    # r.delete_cookie('token')
    r.status_code = status.HTTP_200_OK
    return r


## ---------------------------------- Apartment Related -------------------------------
@api_view(['GET'])
def get_apt_by_addr(request):
    pass


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def get_apt_by_id(request):
    pass


## ---------------------------------- User Info Related -------------------------------
@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def become_advance(request):
    pass

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def get_personal_info(request):
    pass

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def get_user_info(request):
    pass


## -------------------------------- User Group Potential Match ------------------------
@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def add_potential_match(request):
    pass

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def get_potential_match(request):
    pass


## -------------------------------- Group Related Operation ---------------------------
@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def filter_group(request):
    pass

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def create_group(request):
    pass

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def add_to_group(request):
    pass

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def leave_from_group(request):
    pass

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def get_group_info(request):
    pass

 
