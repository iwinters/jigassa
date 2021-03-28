from django.shortcuts import render, redirect
from django.views import generic
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.contrib.auth import login, authenticate
from .forms import RegisterForm

def SignUp(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            try:
                print("gonzo")
                new_user = form.save()
                login(request, new_user, backend='django.contrib.auth.backends.ModelBackend')

                return redirect('wordlist')
            except:
                print("that aint good")
                return render(request, 'registration/register.html', {'form': form, 'email_fail': " • This email is already in use"})
        else:
            print("yikes")

#            username = form.cleaned_data.get('username')
#            raw_password = form.cleaned_data.get('password1')
#            new_user = authenticate(username=form.cleaned_data['username'], password=form.cleaned_data['password1'])

    else:
        form = RegisterForm()
    return render(request, 'registration/register.html', {'form': form})
