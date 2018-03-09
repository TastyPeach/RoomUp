from django.db import models

# Create your models here.
class User(models.Model):
    uid = models.AutoField(primary_key=True)
    username = models.CharField(max_length=20)
    displayname = models.CharField(max_length=20)
    email = models.CharField(max_length=30)
    password = models.CharField(max_length=20)
    #now data field? active?
    def __str__(self):
        return self.username + ", with uid: " + self.uid
    
class Apartment(models.Model):
    aid = models.AutoField(primary_key=True)
    capacity = models.IntegerField()
    price = models.IntegerField()
    address = models.CharField(max_length=50)
    floorplan = models.IntegerField()
    
    def __str__(self):
        return "Apartment wit id: " + self.aid
    
class AdvancedUser(models.Model): #should actually be user-personality
    uid = models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE) # on_delete=models.CASCADE problem
    gid = models.IntegerField(default=1)
    gender = models.IntegerField(null=True)
    age = models.IntegerField(null=True)
    ehtinicity = models.CharField(max_length=10, null=True)
    quiteness = models.IntegerField(null=True) #0-5 
    sanitary = models.IntegerField(null=True) #0-5
    timetobed = models.IntegerField(null=True) #0-5 late otherthings to consider: study often, date, loud music, invite friends to home.
    pet = models.IntegerField(null=True) #0-1 yes or no
    major = models.CharField(max_length=10, null=True)
    hobbies = models.CharField(max_length=256, null=True)
    language = models.CharField(max_length=10, null=True)
    graduationyear = models.IntegerField(null=True)
    note = models.CharField(max_length=256, null=True)

    aid = models.ForeignKey(Apartment, null=True, on_delete=models.DO_NOTHING)
    # Should also be a person-apartment relation? because we need to store that info?
    def __str__(self):
        return "Advance User with uid: " + self.uid
    
    def save(self, *args, **kwargs):
        if self._state.adding:
            # Get the maximum display_id value from the database
            last_id = self.objects.all().aggregate(largest=models.Max('gid'))['largest']
            
            if last_id is not None:
                self.gid = last_id + 1

        super(MyModel, self).save(*args, **kwargs)
    
class Group(models.Model):
    gid = models.AutoField(primary_key=True)
    aid = models.OneToOneField(Apartment, on_delete=models.DO_NOTHING)
    peopleleft = models.IntegerField()
    
    def __str__(self):
        return "Group " +self.gid
    
class PotentialMatch(models.Model):
    pid = models.AutoField(primary_key=True)
    uid = models.ForeignKey(AdvancedUser, on_delete=models.CASCADE)
    gid = models.ForeignKey(Group, on_delete=models.CASCADE)
    