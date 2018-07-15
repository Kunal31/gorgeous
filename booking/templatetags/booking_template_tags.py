from django import template
from django.contrib.auth.models import Group
from booking.models import OrderService

register = template.Library()

@register.filter(name='in_group')
def in_group(user, group_name):
    group = Group.objects.get(name=group_name)
    return group in user.groups.all()

@register.filter(name='get_appointment_services')
def get_appointment_services(order):
    order_services = OrderService.objects.filter(order=order)
    order_service_string = ''
    for os in order_services:
        order_service_string += os.service.name

    return order_service_string
