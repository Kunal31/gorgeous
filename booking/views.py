# -*- coding: utf-8 -*-

from __future__ import unicode_literals

import json
from datetime import datetime,timedelta
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.shortcuts import render
from django.contrib.auth import logout
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail
from django.db.models import Sum
from gorgeous import settings
from booking.models import Service,Customer,Order,Session
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
    first_name = request.POST.get('first_name')
    last_name = request.POST.get('last_name')
    email_id = request.POST.get('email')
    phone_number = request.POST.get('phone_number')
    address = request.POST.get('address')
    zipcode = request.POST.get('zip_code')
    city = request.POST.get('city')
    state = request.POST.get('state')
    country = request.POST.get('select-country')
    appointment_date = request.POST.get('date')
    appointment_time = request.POST.get('timepicker')
    service_category = request.POST.get('select-category')
    selected_service_list = request.POST.getlist('select-service')
    selected_services = Service.objects.filter(category=service_category,\
                               name__in=selected_service_list)
    session_minutes = selected_services.aggregate(session_minutes=Sum('completion_time'))
    session_bill_amount = selected_services.aggregate(session_bill=Sum('price'))
    user=User.objects.create(username=email_id,first_name=first_name,\
                                  last_name=last_name,email=email_id,\
                                  password='gorgeous')
    customer = Customer.objects.create(user=user,contact_no=phone_number)
    session_date = datetime.strptime(appointment_date, "%d-%m-%Y")
    session_start_time = datetime.strptime(appointment_time,"%I:%M %p")
    session_end_time = session_start_time + timedelta(minutes=session_minutes['session_minutes'])
    session = Session.objects.create(session_date=session_date,\
                           start_time=session_start_time,\
                           end_time=session_end_time)
    Order.objects.create(customer=customer,session=session)
    contact(first_name,phone_number,email_id,session_date,session_start_time,session_end_time)

    return HttpResponse('OK',status=200)


def contact(name,contact_no,email,date,start_time,end_time):
    # age = request.POST.get('age')
    date = date.strftime("%d %B %Y")
    start_time = start_time.strftime("%I:%M %p")
    end_time = end_time.strftime("%I:%M %p")

    try:
        html_message_shop = "<table>"
        html_message_shop += "<tr>"
        html_message_shop += "<td><b>" + "Name of Visitor: " + "</b></td>" + "<td><b>" + name + "</b></td>"
        html_message_shop += "</tr>"
        html_message_shop += "<tr>"
        html_message_shop += "<td><b>" + "Contact No: " + "</b></td>" + "<td><b>" + contact_no + "</b></td>"
        html_message_shop += "</tr>"
        html_message_shop += "</table>"

        html_message_customer = "<table>"
        html_message_customer += "<tr>"
        html_message_customer += "<td>"
        html_message_customer += "Congratulations!! Your appointment has been booked with Gorgeous Salon"
        html_message_customer += " on <b>" + date + "</b> from <b>" + start_time + "</b> to <b>" + end_time + "</b>"
        html_message_customer += "</td>"
        html_message_customer += "</tr>"
        html_message_customer += "</table>"

        message = ""
        mail_sent_to_customer = send_mail(settings.NEW_CUSTOMER_SUBJECT,message,settings.EMAIL_HOST_USER,[email],\
                                          html_message=html_message_customer, fail_silently=False)

        mail_sent_to_shop = send_mail(settings.NEW_SHOP_SUBJECT,message,settings.EMAIL_HOST_USER,\
                                    [settings.EMAIL_HOST_USER], html_message=html_message_shop, fail_silently=False)

    except Exception as e:
        print ('%s (%s)' % (e.message, type(e)))
        return HttpResponse("Exception occured while sending mail: %s ", e.__str__())

    return HttpResponse("Sending mail for contact us")


# def contact(request):
#     print request.POST
#     name = request.POST.get('client-name')
#     age = request.POST.get('age')
#     contact_no = request.POST.get('contact_no')
#     email = request.POST.get('client-email')
#     message = request.POST.get('AppointmentMessage')
#
#     try:
#         html_message = "<table>"
#         html_message += "<tr>"
#         html_message += "<td>" + "Name of Visitor: " + "</td>" + "<td>" + name + "</td>"
#         html_message += "<td>" + "Contact No: " + "</td>" + "<td>" + contact_no + "</td>"
#         html_message += "</tr>"
#         # html_message += "<tr><td colspan=2></td></tr>"
#         # html_message += "<tr>"
#         # html_message += message
#         # html_message += "</tr>"
#         html_message = "</table>"
#         mail_sent = send_mail(settings.EMAIL_SUBJECT,message,settings.EMAIL_HOST_USER,[settings.EMAIL_HOST_USER],\
#                                 # html_message=html_message,\
#                               fail_silently=False)
#     except Exception as e:
#         return HttpResponse("Exception occured while sending mail: %s ", e.__str__())
#
#     return HttpResponse("Sending mail for contact us")


def log_out(request):
    logout(request)
    return HttpResponseRedirect(reverse('login'))