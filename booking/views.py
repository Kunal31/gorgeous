# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.shortcuts import render


def test(request):
    print "Inside TEST"
    print request.POST
    return HttpResponse("Hello Django!!")


def index(request):
    return render(request,"index-2.html")


def about(request):
    return render(request,"about.html")


def services(request):
    return render(request,"services.html")


def portfolio(request):
    return render(request,"portfolio-1.html")


def blog_grid(request):
    return render(request,"blog-grid.html")


def blog_single(request):
    return render(request,"blog-single-post.html")


def blog_details(request):
    return render(request,"blog-details.html")