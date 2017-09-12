from django.http import HttpResponse,HttpResponseRedirect
from django.template import loader
from django.shortcuts import render


def login(request):
    print "Inside Login, Showing Post data as follows"
    username = request.POST.get('username')
    password = request.POST.get('password')
    print "Username: ",username
    print "Password: ",password
    #remove below code and redirect to landing page on successful login
    # template = loader.get_template('login.html')
    # return HttpResponse(template.render({}, request))
    # return HttpResponse("redirect me to landing page on successful login")
    return HttpResponseRedirect(request,"index-2.html")