from rest_framework import serializers

from app_basic.models import *             
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email')

class AdvancedUserSerializer(serializers.ModelSerializer):
	uid = UserSerializer(serializers.ModelSerializer)
	class Meta:
	    model = AdvancedUser
	    fields = ('uid', 'gid', 'gender', 'age', 'ethinicity', 'quiteness', 'sanitary', \
	              'timetobed', 'pet', 'major', 'hobbies', 'language', 'graduationyear', \
	              'note')

class ApartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Apartment
        fields = ('aid', 'name', 'capacity', 'price', 'address', 'floorplan', 'occupied')

class GroupSerializer(serializers.ModelSerializer):
	admin_uid = AdvancedUserSerializer(serializers.ModelSerializer)
	class Meta:
		model = Group
		fields = ('gid', 'group_name', 'aid', 'peopleleft', 'admin_uid', 'active')

class PotentialMatch(serializers.ModelSerializer):
    pass

                                                                
