from django.shortcuts import render, redirect
from django.views import generic
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.contrib.auth import login, authenticate
from .forms import RegisterForm
from app.models import vocabulary



from django.http.response import JsonResponse
from django.contrib.auth import authenticate, login
import json
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.core import serializers
import datetime
from django.conf import settings
from django.views import View
from django.views.generic.base import TemplateView
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

endpoint_secret =  'whsec_pnfClfo1HimyTr79vijLnyQCetxA6Mxc'


def SignUp(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            try:
                new_user = form.save()
                login(request, new_user, backend='django.contrib.auth.backends.ModelBackend')

                return redirect('wordlist')
            except:
                return render(request, 'registration/register.html', {'form': form, 'email_fail': " • This email is already in use"})
        else:
            pass


#            username = form.cleaned_data.get('username')
#            raw_password = form.cleaned_data.get('password1')
#            new_user = authenticate(username=form.cleaned_data['username'], password=form.cleaned_data['password1'])

    else:
        form = RegisterForm()
    return render(request, 'registration/register.html', {'form': form})

