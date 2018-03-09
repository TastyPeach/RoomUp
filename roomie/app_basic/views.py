from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    my_dick = {'insert_me' : "Hello I am from views.py"}
    return render(request, 'app_basic/index.html', context=my_dick)