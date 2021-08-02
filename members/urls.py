from django.urls import path
from .views import SignUp, payment_hooks, settings


urlpatterns = [
    path('register/', SignUp, name='register'),
    path('auth/settings', settings, name='settings'),
    path('paymenthooks/', payment_hooks, name='hooks')

]