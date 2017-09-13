from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^index$', views.index, name='index'),
    url(r'^about$', views.about, name='about'),
    url(r'^services$', views.services, name='services'),
    url(r'^portfolio$', views.portfolio, name='portfolio'),

    url(r'^blog_grid$', views.blog_grid, name='blog_grid'),
    url(r'^blog_single', views.blog_single, name='blog_single'),
    url(r'^blog_details$', views.blog_details, name='blog_details'),

    url(r'^logout$',views.log_out,name="logout"),
]