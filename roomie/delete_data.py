from app_basic.models import *

Group.objects.all().delete()
User.objects.all().delete()
AdvancedUser.objects.all().delete()
Apartment.objects.all().delete()
PotentialMatch.objects.all().delete()