from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def index(request):
    # return render(request, "test_app\index.html")
    return render(request, "test_app/index.html",{})

def brian(request):
    return HttpResponse("Hello, Brian!")

def david(request):
    return HttpResponse("Hello, David!")

def greet(request, name):
    return render(request, "test_app/greet.html", {
        "name": name.capitalize()
    })