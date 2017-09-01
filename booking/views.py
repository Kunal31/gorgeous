# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render


def test(request):
    return HttpResponse("Hello Django!!")


def login(request):
    pass
#     template = loader.get_template('login.html')
#     return HttpResponse(template.render({}, request))