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
def get_apt_by_name(request):
    # TODO: support get_apt_by_address
    pass


@api_view(['GET'])
@parser_classes((JSONParser,)) 
#@permission_classes((IsAuthenticated,))
def get_apt_by_id(request):
    aid = request.query_params.get('aid')
    apt = Apartment.objects.filter(aid=aid)[0]
    apt_ser = ApartmentSerializer(apt)
    return JsonResponse(apt_ser.data, safe=False)

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
#@permission_classes((IsAuthenticated,))
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
     name = request.data.get("name")
     price = request.data.get("price")
     address = request.data.get("address")
     floorplan = request.data.get("floorplan")
     occupied = request.data.get("occupied")

     apt = Apartment(name=name, price=price, address=address, floorplan=floorplan, occupied=occupied)
     apt.save()

     uid = request.data.get("uid")
     user = User.objects.get(id=uid)
     advance = AdvancedUser.objects.get(uid=user)
     capacity = request.data.get("capacity")
     group_name = request.data.get("group_name")
     group = Group(group_name=group_name, aid=apt, peopleleft=capacity-1, capacity=capacity, admin_uid=advance)
     group.save()

     uid = request.data.get("uid")
     user = User.objects.get(id=uid)
     advance = AdvancedUser.objects.get(uid=user)
     advance.gid = group
     advance.save()

     return Response(status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def add_to_group(request):
	gid = request.data.get('gid')
	group = Group.objects.get(gid=gid)
	if group.peopleleft <= 0:
		return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
	else:
		group.peopleleft = group.peopleleft-1
		group.save()
		uid = request.data.get('uid')
		user = User.objects.get(id=uid)
		advance = AdvancedUser.objects.get(uid=user)
		advance.gid = group
		advance.save()
	return Response(status=status.HTTP_202_ACCEPTED)

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def leave_from_group(request):
	uid = request.data.get("uid")
	user = User.objects.get(id=uid)
	advance = AdvancedUser.objects.get(uid=user)
	gid = request.data.get('gid')
	group = Group.objects.get(gid=gid)
	if group.peopleleft+1 == group.capacity:
		group.active = False;
		group.save()
		advance.gid = None;
		advance.save()
	elif user.username == group.admin_uid.uid.username:
		refer_uid = request.data.get("refer_uid")
		refer_user = User.objects.get(id=refer_uid)
		refer_advance = AdvancedUser.objects.get(uid=refer_user)
		group.admin_uid = refer_advance
		group.peopleleft = group.peopleleft + 1
		group.save()
		advance.gid = None;
		advance.save();
	else:
		advance.gid = None;
		advance.save();
		group.peopleleft = group.peopleleft + 1
		group.save()
	return Response(status=status.HTTP_202_ACCEPTED)

@api_view(['GET'])
# @permission_classes((IsAuthenticated,))
def get_group_info(request):
    gid = request.query_params.get('gid')
    group = Group.objects.get(gid=gid)
    group_ser = GroupSerializer(group)
    users = AdvancedUser.objects.filter(gid=group)
    users_dict_list = []
    for user in users:
    	users_dict_list.append(AdvancedUserSerializer(user).data)
    return JsonResponse({"group" : [group_ser.data], "users" : users_dict_list}, safe=False)


 
