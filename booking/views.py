# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.shortcuts import render
from django.contrib.auth import logout
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail
from gorgeous import settings
from gorgeous.celery import app


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


def contact(request):
    print request.POST
    name = request.POST.get('client-name')
    age = request.POST.get('age')
    contact_no = request.POST.get('contact_no')
    email = request.POST.get('client-email')
    message = request.POST.get('AppointmentMessage')

    try:
        html_message = "<table>"
        html_message += "<tr>"
        html_message += "<td>" + "Name of Visitor: " + "</td>" + "<td>" + name + "</td>"
        html_message += "<td>" + "Contact No: " + "</td>" + "<td>" + contact_no + "</td>"
        html_message += "</tr>"
        # html_message += "<tr><td colspan=2></td></tr>"
        # html_message += "<tr>"
        # html_message += message
        # html_message += "</tr>"
        html_message = "</table>"
        mail_sent = send_mail(settings.EMAIL_SUBJECT,message,settings.EMAIL_HOST_USER,[settings.EMAIL_HOST_USER],\
                                # html_message=html_message,\
                              fail_silently=False)
    except Exception as e:
        return HttpResponse("Exception occured while sending mail: %s ", e.__str__())

    return HttpResponse("Sending mail for contact us")


def log_out(request):
    logout(request)
    return HttpResponseRedirect(reverse('login'))


@app.task(name="add")
def addition(a,b):
    return a + b