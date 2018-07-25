# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import models

from django.contrib import admin

admin.site.register(models.Service)
admin.site.register(models.Customer)
admin.site.register(models.Session)
admin.site.register(models.Order)
admin.site.register(models.Beautician)
admin.site.register(models.Feedback)


