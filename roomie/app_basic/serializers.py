from rest_framework import serializers

from app_basic.models import *
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')

class AdvancedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdvancedUser
        fields = ('gid', 'gender', 'age', 'ehtinicity', 'quiteness', 'sanitary', \
                  'timetobed', 'pet', 'major', 'hobbies', 'language', 'graduationyear', \
                  'note', 'aid')

class ApartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Apartment
        fields = ('aid', 'capacity', 'price', 'address', 'floorplan')

class Group(serializers.ModelSerializer):
    pass

class PotentialMatch(serializers.ModelSerializer):
    pass

                                                                
