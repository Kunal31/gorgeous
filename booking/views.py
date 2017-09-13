# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.shortcuts import render
from django.contrib.auth import logout
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required


@login_required
def index(request):
    return render(request,"index-2.html")


@login_required
def about(request):
    print request.user
    return render(request,"about.html")


@login_required
def services(request):
    return render(request,"services.html")


@login_required
def portfolio(request):
    return render(request,"portfolio-1.html")


@login_required
def blog_grid(request):
    return render(request,"blog-grid.html")


@login_required
def blog_single(request):
    return render(request,"blog-single-post.html")


@login_required
def blog_details(request):
    return render(request,"blog-details.html")


def log_out(request):
    logout(request)
    return HttpResponseRedirect(reverse('login'))