from django.shortcuts import render, redirect
from django.views import generic
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.contrib.auth import login, authenticate
from .forms import RegisterForm



from django.http.response import JsonResponse
from django.contrib.auth import authenticate, login
import json
import stripe
from django.http import JsonResponse
from django.shortcuts import render, redirect
from members.models import Customer
from django.contrib.auth.models import User
from django.core import serializers
import datetime
from django.conf import settings
from django.views import View
from django.views.generic.base import TemplateView
stripe.api_key = 'sk_test_51J3V8wJqVp0q1s0YtWIM56uFS2hqGeJ2EKGW5xwDtMK9pOijw3ZmxyQWurvMfJ3A21irmAQx9YpfPPm7VLgXaU0U00eKJB6bxm'
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

                return redirect('checkout')
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


def join(request):
    return render(request, 'members/join.html')


def success(request):
    if request.method == 'GET' and 'session_id' in request.GET:
        session = stripe.checkout.Session.retrieve(request.GET['session_id'],)
        customer = Customer()
        customer.user = request.user
        customer.stripeid = session.customer
        customer.membership = True
        customer.cancel_at_period_end = False
        customer.stripe_subscription_id = session.subscription
        customer.save()
    return redirect('testselect')


def cancel(request):
    return render(request, 'members/cancel.html')


@login_required
def checkout(request):

    try:
        if request.user.customer.membership:
            return redirect('settings')
    except Customer.DoesNotExist:
        pass

    if request.method == 'POST':
        pass
    else:
        membership = 'monthly'
        final_dollar = 10
        membership_id = 'price_1J45LRJqVp0q1s0YRuK3GXBe'
        if request.method == 'GET' and 'membership' in request.GET:
            if request.GET['membership'] == 'yearly':
                membership = 'yearly'
                membership_id = 'price_1J45LRJqVp0q1s0YRuK3GXBe'
                final_dollar = 100

        # Create Strip Checkout
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            customer_email = request.user.email,
            line_items=[{
                'price': membership_id,
                'quantity': 1,
            }],
            mode='subscription',
            allow_promotion_codes=True,
            success_url='http://127.0.0.1:8000/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url='http://127.0.0.1:8000/cancel',
        )

        return render(request, 'members/checkout.html', {'final_dollar': final_dollar, 'session_id': session.id})

@login_required
def settings(request):
    membership = False
    cancel_at_period_end = False
    if request.method == 'POST':
        subscription = stripe.Subscription.retrieve(request.user.customer.stripe_subscription_id)
        subscription.cancel_at_period_end = True
        request.user.customer.cancel_at_period_end = True
        cancel_at_period_end = True
        subscription.save()
        request.user.customer.save()
    else:
        try:
            if request.user.customer.membership:
                membership = True
            if request.user.customer.cancel_at_period_end:
                cancel_at_period_end = True
        except Customer.DoesNotExist:
            membership = False
    return render(request, 'members/settings.html', {'membership':membership,
    'cancel_at_period_end':cancel_at_period_end})

@csrf_exempt
def payment_hooks(request):
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    event = None

    try:
        event = stripe.Webhook.construct_event(
        payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        # Invalid payload
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return HttpResponse(status=400)

    # Handle the event
    if event.type == 'payment_intent.succeeded':
        payment_intent = event.data.object # contains a stripe.PaymentIntent
        print('PaymentIntent was successful!')
    elif event.type == 'payment_method.attached':
        payment_method = event.data.object # contains a stripe.PaymentMethod
        print('PaymentMethod was attached to a Customer!')
    # ... handle other event types
    else:
        print('Unhandled event type {}'.format(event.type))

    return HttpResponse(status=200)