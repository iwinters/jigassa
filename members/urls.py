from django.urls import path
from .views import SignUp


urlpatterns = [
    path('register/', SignUp, name='register')
]