# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render


def test(request):
    print "Inside TEST"
    print request.POST
    return HttpResponse("Hello Django!!")