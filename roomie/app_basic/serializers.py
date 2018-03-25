from rest_framework import serializers

from app_basic.models import *
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')

class AdvancedUserSerializer(serializers.ModelSerializer):
    uid = UserSerializer(required=True)
    class Meta:
        model = AdvancedUser
        fields = ('uid', 'gid', 'gender', 'age', 'ehtinicity', 'quiteness', 'sanitary', \
                  'timetobed', 'pet', 'major', 'hobbies', 'language', 'graduationyear', \
                  'note', 'aid')

class ApartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Apartment
        fields = ('aid', 'name', 'capacity', 'price', 'address', 'floorplan', 'occupied')

class GroupSerializer(serializers.ModelSerializer):
    pass

class PotentialMatchSerializer(serializers.ModelSerializer):
    gid = GroupSerializer(required=True)
    uid = AdvancedUserSerializer(required=True)
    class Meta:
        model = PotentialMatch
        fields = ('pid', 'uid', 'gid')
        

                                                                
