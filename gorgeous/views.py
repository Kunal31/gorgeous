from django.http import HttpResponse,HttpResponseRedirect
from django.template import loader
from django.shortcuts import render
from django.contrib.auth.models import User
from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist
from django.core.urlresolvers import reverse
from django.contrib.auth import authenticate, login
from django.views import View


class LoginView(View):
    template_name = 'login.html'

    def get(self,request):
        print "INSIDE GETTTT"
        print request.GET.get('next')
        template = loader.get_template(self.template_name)
        context = {'redirection_url':request.GET.get('next')}
        return HttpResponse(template.render(context, request))

    def post(self,request):
        print "INSIDE POSTTTT"
        username = request.POST.get('username')
        password = request.POST.get('password')

        # if request.POST.get('remember_me'):
        #     request.session['remember_me'] = True

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            redirection_url = request.POST.get('redirection_url')
            redirection_url = None if redirection_url == 'None' else redirection_url
            if redirection_url is not None:
                return HttpResponseRedirect(redirection_url)
            else:
                return HttpResponseRedirect(reverse('index'))
        else:
            return self.get(request)