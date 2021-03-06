# -*- coding: utf-8 -*-

from __future__ import unicode_literals

import json
from datetime import datetime,timedelta
from operator import itemgetter
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.shortcuts import render
from django.contrib.auth import logout
from django.contrib.auth.models import User,Group
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Sum
from django.db.models import Case, When
from gorgeous import settings
from booking.models import Service,Customer,Order,Session,\
    Invoice,OrderService,Feedback,Beautician
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
    skin_services = Service.objects.filter(category='skin')
    hair_services = Service.objects.filter(category='hair')
    beauticians = Beautician.objects.all()
    context = {'services':services,
               'service_categories':service_categories,
               'skin_services': skin_services,
               'hair_services': hair_services,
               'beauticians': beauticians
               }
    return render(request,"index-2.html",context)


@login_required()
def subscribe_newsletter(request):
    email_id = request.POST.get('email_id')
    # return HttpResponse('OK', status=200)
    return HttpResponseRedirect(reverse('index'))


@login_required
def about(request):
    beauticians = Beautician.objects.all()
    context = {'beauticians':beauticians}
    print request.user
    return render(request,"about.html",context)


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


@login_required
def beautician_details(request,id):
    b = Beautician.objects.get(id=id)
    context = {"beautician":b}
    return render(request,"beautician-details.html",context)


@login_required
def appointments(request):
    o1 = Order.objects.filter(session__session_date__gt=datetime.now().date())
    o2 = Order.objects.filter(session__session_date=datetime.now().date(), \
                             session__start_time__gte=datetime.now().time())
    required_appointments = o1.union(o2).filter(session__is_completed=False)

    orders = []
    for apt in required_appointments:
        orders.append({'id':apt.id,'datetime':datetime.combine(apt.session.session_date,\
                                                               apt.session.start_time)})
    sorted_orders = sorted(orders, key=itemgetter('datetime'))
    sorted_order_ids = [order['id'] for order in sorted_orders]

    preserved = Case(*[When(pk=pk, then=pos) for pos, pk in enumerate(sorted_order_ids)])
    appointments = Order.objects.filter(id__in=sorted_order_ids).order_by(preserved)

    context = {'apptmnts':appointments}
    return render(request,"appointments.html",context)


@login_required
def feedbacks(request):
    f = Feedback.objects.filter(is_inappropriate=False).order_by('-feedback_timestamp')
    context = {'feedbacks':f}
    return render(request,"feedbacks.html",context)


@login_required()
def save_feedback(request):
    feedback_content = request.POST.get('feedback_message')
    # if len(feedback_content) < 160:
    #     added_space_count = 160 - len(feedback_content)
    #     feedback_content += ' ' * added_space_count
    Feedback.objects.create(customer=request.user,content=feedback_content)
    return HttpResponseRedirect(reverse('feedback_details'))


@csrf_exempt
@login_required()
def get_services(request):
    print "getting related services"
    service_category = request.POST.get('service_category')
    services = list(Service.objects.filter(category=service_category).values_list('name',flat=True))
    return HttpResponse(json.dumps({'services':services}),status=200)


@login_required()
def single_service(request,service_id):
    service = Service.objects.get(id=service_id)
    context = {'service':service}
    return render(request,'single_service.html',context)


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
    appointment_time = request.POST.get('time')
    service_category = request.POST.get('select-category')
    selected_service_list = request.POST.getlist('select-service')
    selected_services = Service.objects.filter(category=service_category,\
                               name__in=selected_service_list)
    session_minutes = selected_services.aggregate(session_minutes=Sum('completion_time'))
    session_bill_amount_dict = selected_services.aggregate(session_bill=Sum('price'))
    session_bill_amount = session_bill_amount_dict['session_bill']
    try:
        user = User.objects.get(username=email_id)
    except ObjectDoesNotExist:
        user=User.objects.create(username=email_id,first_name=first_name,\
                                  last_name=last_name,email=email_id)
        customer_password = first_name+'@123'
        user.set_password(customer_password)
        user.save()

    ### user group pairing ###
    user_type = "customer"
    if user_type == "customer":
        group = Group.objects.get(name="customer")
    elif user_type == "beautician":
        group = Group.objects.get(name="beautician")

    user.groups.add(group)
    ###

    try:
        customer = Customer.objects.get(user=user)
        customer_password = ''
    except ObjectDoesNotExist:
        customer = Customer.objects.create(user=user,contact_no=phone_number)
    session_date = datetime.strptime(appointment_date, "%d-%m-%Y")
    session_start_time = datetime.strptime(appointment_time,"%H:%M")
    session_end_time = session_start_time + timedelta(minutes=session_minutes['session_minutes'])
    session = Session.objects.create(session_date=session_date,\
                           start_time=session_start_time,\
                           end_time=session_end_time)
    order = Order.objects.create(customer=customer,session=session)
    for service in selected_services:
        OrderService.objects.create(order=order,service=service)

    gst_amount = (session_bill_amount * 18) / 100
    gross_amount = session_bill_amount + gst_amount
    invoice = Invoice.objects.create(order=order,net_bill=session_bill_amount,gst=gst_amount,gross_bill=gross_amount)

    send_email(first_name,phone_number,email_id,customer_password,session_date,session_start_time,session_end_time,\
            session_bill_amount,gst_amount,gross_amount)

    return HttpResponseRedirect(reverse('index'))


def send_email(name,contact_no,email_id,customer_password,date,start_time,end_time,net_bill_amount,gst_amount,gross_bill_amount):
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
        html_message_shop += "<tr>"
        html_message_shop += "<td><b>" + "Timing: " + "</b></td>" + "<td><b>" + date + " from " + start_time + " to " + end_time +"</b></td>"
        html_message_shop += "</tr>"
        html_message_shop += "</table>"

        html_message_customer = "<table>"
        html_message_customer += "<tr>"
        html_message_customer += "<td colspan=3>"
        html_message_customer += "Congratulations!! Your appointment has been booked with Gorgeous Salon"
        html_message_customer += " on <b>" + date + "</b> from <b>" + start_time + "</b> to <b>" + end_time + "</b>"
        html_message_customer += "</td>"
        html_message_customer += "</tr>"
        html_message_customer += "<tr><td colspan=3></td></tr>"
        html_message_customer += "<tr><td colspan=3></td></tr>"
        if customer_password:
            html_message_customer += "<tr>"
            html_message_customer += "<td colspan=3>"
            html_message_customer += "Kindly visit kunal31.pythonanywhere.com and login with given credentials for further info."
            html_message_customer += "</td>"
            html_message_customer += "</tr>"
            html_message_customer += "<tr>"
            html_message_customer += "<td colspan=3>"
            html_message_customer += "Your username is <b>"+email_id+"</b> & password is <b>"+ customer_password +"</b>"
            html_message_customer += "</td>"
            html_message_customer += "</tr>"
        else:
            html_message_customer += "<tr>"
            html_message_customer += "<td colspan=3>"
            html_message_customer += "Kindly visit kunal31.pythonanywhere.com and login with your username and password for further info."
            html_message_customer += "</td>"
            html_message_customer += "</tr>"
        html_message_customer += "<tr><td colspan=3></td></tr>"
        html_message_customer += "<tr><td colspan=3></td></tr>"
        html_message_customer += "<tr>"
        html_message_customer += "<td><b>Bill Amount</b></td><td><b>GST Amount</b></td><td><b>Total bill Amount</b></td>"
        html_message_customer += "</tr>"
        html_message_customer += "<tr>"
        html_message_customer += "<td>"+str(net_bill_amount)+"</td><td>"+str(gst_amount)+"</td><td>"+str(gross_bill_amount)+"</td>"
        html_message_customer += "</tr>"
        html_message_customer += "</table>"

        message = ""
        mail_sent_to_customer = send_mail(settings.NEW_CUSTOMER_SUBJECT,message,settings.EMAIL_HOST_USER,[email_id],\
                                          html_message=html_message_customer, fail_silently=False)
        print "Mail sent to customer: ",mail_sent_to_customer

        mail_sent_to_shop = send_mail(settings.NEW_SHOP_SUBJECT,message,settings.EMAIL_HOST_USER,\
                                    [settings.EMAIL_HOST_USER], html_message=html_message_shop, fail_silently=False)
        print "Mail sent to shop: ",mail_sent_to_shop

    except Exception as e:
        print ('%s (%s)' % (e.message, type(e)))
        return HttpResponse("Exception occured while sending mail: %s ", e.__str__())

    return HttpResponse(status=200)


def contact(request):
    print request.POST
    name = request.POST.get('client-name')
    age = request.POST.get('age')
    contact_no = request.POST.get('contact_no')
    email_id = request.POST.get('client-email')
    message = request.POST.get('AppointmentMessage')

    try:
        html_message = "<table border=1 bgcolor='silver'>"
        html_message += "<tr><td><b>" + "Name of Visitor " + "</b></td>" + "<td>" + name + "</td></tr>"
        if age:
            html_message += "<tr><td><b>" + "Age " + "</b></td>" + "<td>" + age + "</td></tr>"
        html_message += "<tr><td><b>" + "Contact No " + "</b></td>" + "<td>" + contact_no + "</td></tr>"
        if email_id:
            html_message += "<tr><td><b>" + "Email Id " + "</b></td>" + "<td>" + email_id + "</td></tr>"
        if message:
            html_message += "<tr><td><b>" + "Message " + "</b></td>" + "<td>" + message + "</td></tr>"
        html_message += "</table>"
        message_text = ''
        mail_sent = send_mail(settings.EMAIL_SUBJECT,message_text,settings.EMAIL_HOST_USER,[settings.EMAIL_HOST_USER],\
                                html_message=html_message,fail_silently=False)
    except Exception as e:
        return HttpResponse("Exception occured while sending Contact Us mail: %s ", e.__str__())

    return HttpResponseRedirect(reverse('index'))


@login_required()
def orders(request):
    if request.POST:
        from_date = request.POST.get('from_date')
        to_date = request.POST.get('to_date')
        from_date = datetime.strptime(from_date, "%d-%m-%Y")
        to_date = datetime.strptime(to_date, "%d-%m-%Y")
        o = Order.objects.filter(session__session_date__gte=from_date, \
                                 session__session_date__lte=to_date).\
            order_by('session__session_date','session__start_time')
        context = {'orders':o}
        return render(request,'orders.html',context=context)
    else:
        return render(request,'orders.html',context={})

def log_out(request):
    logout(request)
    return HttpResponseRedirect(reverse('login'))