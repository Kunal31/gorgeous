# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models


class Customer(models.Model):
    class Meta:
        db_table = "customer"

    user = models.OneToOneField(User)
    contact_no = models.BigIntegerField()
    reward_points = models.IntegerField(default=0)

    def __str__(self):
        return self.user.first_name


class Beautician(models.Model):
    class Meta:
        db_table = "beautician"

    user = models.OneToOneField(User)
    contact_no = models.BigIntegerField()
    experience_details = models.TextField(default=None)

    def __str__(self):
        return self.user.first_name


class Service(models.Model):
    class Meta:
        db_table = "service"

    name = models.CharField(max_length=50)
    category = models.CharField(max_length=50)
    completion_time = models.IntegerField() #in Minutes
    price = models.IntegerField()
    image = models.ImageField(upload_to='services/',null=True,blank=True)
    short_description = models.CharField(max_length=1000,null=True,blank=True)
    long_description = models.CharField(max_length=5000,null=True,blank=True)

    def __str__(self):
        return self.name


class Session(models.Model):
    class Meta:
        db_table = "session"

    session_date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return "{0} {1} To {2}".format(self.session_date,self.start_time,self.end_time)


class Order(models.Model):
    class Meta:
        db_table = "order"

    customer = models.ForeignKey(Customer)
    session = models.ForeignKey(Session)

    def __str__(self):
        return "{0} @ {1} From {2} To {3}".format(self.customer.user.first_name,self.session.session_date,\
                                             self.session.start_time,self.session.end_time)


class OrderService(models.Model):
    class Meta:
        db_table = "order_service"

    order = models.ForeignKey(Order)
    service = models.ForeignKey(Service)

    def __str__(self):
        return self.id


class Invoice(models.Model):
    class Meta:
        db_table = "invoice"

    order = models.ForeignKey(Order)
    net_bill = models.FloatField()
    gst = models.FloatField()
    gross_bill = models.FloatField()

    def __str__(self):
        return self.order.id


class Feedback(models.Model):
    class Meta:
        db_table = "feedback"

    customer = models.FloatField(Customer)
    date = models.DateField(auto_now_add=True)
    content = models.CharField(max_length=1000)
    is_inappropriate = models.BooleanField(default=False)

    def __str__(self):
        return self.id
