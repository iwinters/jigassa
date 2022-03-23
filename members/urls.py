from django.urls import path
from .views import SignUp, settings


urlpatterns = [
    path('register/', SignUp, name='register'),
]