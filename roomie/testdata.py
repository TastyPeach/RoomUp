from app_basic.models import User, AdvancedUser, Apartment, Group, PotentialMatch

zrl_apart = Apartment(capacity = 4, price = 635, address = "1010 W Univerisity Ave", floorplan = 3)
zrl = User(username="ruilinzhang", displayname="rzhang74", email="rzhang74@illinois.edu", password="orz")
zrl_a = AdvancedUser(uid = zrl.uid)