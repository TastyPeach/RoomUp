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
    return JsonResponse(apt_ser.data, safe=True)

## ---------------------------------- User Info Related -------------------------------
@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def become_advance(request):
    u = request._request.user
    gender = request.data.get('gender')
    age = request.data.get('age')
    ethinicity = request.data.get('ethinicity')
    quietness = request.data.get('quietness')
    sanitary = request.data.get('sanitary')
    timetobed = request.data.get('timetobed')
    # otherthings to consider: study often, date, loud music, invite friends to home.
    pet = request.data.get('pet')
    major = request.data.get('major')
    hobbies = request.data.get('hobbies')
    language = request.data.get('language')
    graduationyear = request.data.get('graduationyear')
    note = request.data.get('note')

    adv_u = AdvancedUser(uid=u, gender=gender, age=age, ethinicity=ethinicity, quietness=quietness, \
                         sanitary=sanitary, timetobed=timetobed, pet=pet, major=major, hobbies=hobbies, \
                         language=language, graduationyear=graduationyear, note=note, gid=None)
    adv_u.save()
    return JsonResponse(status=status.HTTP_201_CREATED)
    

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def get_personal_info(request):
    u = request._request.user
    adv_u = AdvancedUser.objects.filter(uid=u)
    adv_ser = AdvancedUserSerializer(adv_u)
    return JsonResponse(adv_ser.data)

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def get_user_info(request):
    uid = request.data.get('uid')
    user = User.objects.get(id=uid)
    adv_u = AdvancedUser.objects.get(uid=user)
    adv_ser = AdvancedUserSerializer(adv_u)
    return JsonResponse(adv_ser.data)

## -------------------------------- User Group Potential Match ------------------------
@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def add_potential_match(request):
    u = request._request.user
    gid = request.data.get('gid')
    g = Group.objects.get(gid=gid)
    pm = PotentialMatch(uid=u, gid=g)
    pm.save()
    return JsonResponse(status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def get_potential_match(request):
    u = request._request.user
    adv_u = AdvancedUser.objects.get(uid=u)
    pms = PotentialMatchSerializer(uid=u)
    ret = []
    for pm in pms:
        ret.append(PotentialMatchSerializer(pm).data)
    return JsonResponse(ret, safe=False)


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