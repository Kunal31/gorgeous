from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render


def login(request):
    print "Inside Login, Showing Post data as follows"
    print request.POST
    template = loader.get_template('login.html')
    return HttpResponse(template.render({}, request))