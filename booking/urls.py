from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^test$', views.test, name='test'),
    url(r'^index_test$', views.index_test, name='index_test'),
    url(r'^index$', views.index, name='index'),
    url(r'^subscribe_newsletter$', views.subscribe_newsletter, name='newsletter_subscription'),
    url(r'^about$', views.about, name='about'),
    url(r'^services$', views.services, name='services'),
    url(r'^portfolio$', views.portfolio, name='portfolio'),

    url(r'^get_services', views.get_services, name='get_services'),
    url(r'^single_service/([0-9]+)$', views.single_service, name='single_service'),
    url(r'^book_appointment$', views.book_appointment, name='book_appointment'),

    url(r'^blog_grid$', views.blog_grid, name='blog_grid'),
    url(r'^blog_single', views.blog_single, name='blog_single'),
    url(r'^blog_details$', views.blog_details, name='blog_details'),

    url(r'^appointments$', views.appointments, name='appointment_details'),
    url(r'^feedbacks$', views.feedbacks, name='feedback_details'),
    url(r'^save_feedback$', views.save_feedback, name='save_feedback'),
    url(r'^beauticians/([0-9]+)$', views.beautician_details, name='beautician_details'),

    url('^orders$',views.orders,name="orders"),
    url('^contact$',views.contact,name='contact'),
    url(r'^logout$',views.log_out,name="logout"),
]