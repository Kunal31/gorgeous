# -*- coding: utf-8 -*-

from __future__ import unicode_literals

import json
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.shortcuts import render
from django.contrib.auth import logout
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail
from gorgeous import settings
from booking.models import Service
from django.views.decorators.csrf import csrf_exempt
import pdb


@login_required
def test(request):
    return render(request,"test.html")


@login_required
def index_test(request):
    return render(request,"index-test.html")


@login_required
def index(request):
    services = Service.objects.all()
    service_categories = Service.objects.values_list('category', flat=True).distinct()
    context = {'services':services,'service_categories':service_categories}
    return render(request,"index-2.html",context)


@login_required
def about(request):
    print request.user
    return render(request,"about.html")


@login_required
def services(request):
    skin_services = Service.objects.filter(category='skin')
    hair_services = Service.objects.filter(category='hair')
    context = {'skin_services':skin_services,'hair_services':hair_services}
    return render(request,"services.html",context)


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

@csrf_exempt
@login_required()
def get_services(request):
    print "getting related services"
    service_category = request.POST.get('service_category')
    services = list(Service.objects.filter(category=service_category).values_list('name',flat=True))
    return HttpResponse(json.dumps({'services':services}),status=200)


@login_required
def book_appointment(request):
    phone_number = request.POST.get('phone_number')
    city = request.POST.get('city')
    first_name = request.POST.get('first_name')
    last_name = request.POST.get('last_name')
    country = request.POST.get('select-country')
    state = request.POST.get('state')
    address = request.POST.get('address')
    email_id = request.POST.get('email')
    zipcode = request.POST.get('zip_code')


    return HttpResponse('OK',status=200)

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