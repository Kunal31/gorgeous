from django.http import HttpResponse,HttpResponseRedirect
from django.template import loader
from django.shortcuts import render
from django.contrib.auth.models import User
from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist
from django.core.urlresolvers import reverse
from django.contrib.auth import authenticate


def login(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    if request.POST.get('remember_me'):pass

    user = authenticate(username=username, password=password)

    if user is not None:
        return HttpResponseRedirect(reverse('index'))
    else:
        return HttpResponseRedirect(reverse('landing'))

    #remove below code and redirect to landing page on successful login
    # template = loader.get_template('login.html')
    # return HttpResponse(template.render({}, request))