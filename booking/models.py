# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models


class Customer(models.Model):
    class Meta:
        db_table = "customer"

    user = models.OneToOneField(User)
    contact_no = models.IntegerField()
    reward_points = models.IntegerField(default=0)

    def __str__(self):
        return self.user.name


class Service(models.Model):
    class Meta:
        db_table = "service"

    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to='services/')
    short_description = models.CharField(max_length=1000)
    long_description = models.CharField(max_length=5000)

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
        return self.id


class Order(models.Model):
    class Meta:
        db_table = "order"

    customer = models.ForeignKey(Customer)
    session = models.ForeignKey(Session)

    def __str__(self):
        return self.id


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
    order = models.FloatField(Order)
    content = models.CharField(max_length=1000)
    is_inappropriate = models.BooleanField(default=False)

    def __str__(self):
        return self.id
