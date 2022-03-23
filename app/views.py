from django.http.response import JsonResponse
from django.contrib.auth import authenticate, login
import json
import stripe
from django.http import JsonResponse
from django.shortcuts import render, redirect
from .models import dictionary, vocabulary, product
from members.models import Customer
from .forms import VocabularyFormSet, WordListFormSet
from django.contrib.auth.models import User
from django.core import serializers
import datetime
from django.conf import settings
from django.views import View
from django.views.generic.base import TemplateView
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth.decorators import user_passes_test

def member_check(user):
    if hasattr(user, 'customer') and user.customer.membership is True:
        return True
    else:
        return False

@login_required
@user_passes_test(member_check, login_url='checkout')
def wordlist(request):
    if request.user.is_authenticated:
        today = datetime.date.today()
        focus_words = vocabulary.objects.filter(user = request.user).filter(focus__gt = today)[:10]
        week_words = dictionary.objects.exclude(dict_words__user=request.user)[:10]
        if focus_words:
            #if the user already has focus words, just go to testselect
            return redirect('testselect')
        elif not week_words:
            return redirect('testselect')
        else:
            context = {"words": week_words}
            print("char")
            return render(request, "app/word-list.html", context)
    else:
        return redirect('login')

def addwordlist(request):
    week_words = dictionary.objects.exclude(dict_words__user=request.user)[:10]
    count = 0
    for word in week_words:
        thing = vocabulary(user = request.user, word= week_words[count], confidence = 0, next_review = datetime.date.today(), focus = datetime.date.today() + datetime.timedelta(days=7))
        thing.save()
        count += 1
    return redirect('testselect')

@login_required(login_url='raselraju')
@user_passes_test(member_check, login_url='raselraju')
def cardtest(request, lang):
    if request.user.is_authenticated:
        today = datetime.date.today()
        focus_words = vocabulary.objects.filter(user = request.user).filter(focus__gt = today)[:10]
        week_words = dictionary.objects.exclude(dict_words__user=request.user)[:10] #a fresh set of words that the user has not seen before
        refresher_words = vocabulary.objects.filter(user = request.user).filter(focus__lt = today).order_by('next_review')[:5] #words that the user has seen before and is refreshing on
        extra_refresher_words = vocabulary.objects.filter(user = request.user).filter(focus__lt = today).order_by('next_review')[:15] #refresher words, but more of them - for when users has no focus or week words
        if focus_words:
                    session_words = focus_words | refresher_words
                    session_words = session_words.order_by('-word_id')
        else:
            if week_words:
                return redirect('wordlist')
            else:
                session_words = focus_words | extra_refresher_words #including focus words here fools django that this is a query, not a slice, so I can sort it again
                session_words = session_words.order_by('-word_id') #i don't entirely remember, but I think this was so that things match up correctly in the front end
                print(session_words)

        form = VocabularyFormSet(request.user)
        print(session_words)
        if request.method == "POST":
            formset = VocabularyFormSet(request.user, request.POST)

            if formset.is_valid():
                for form in formset.cleaned_data:
                    #user,word,focus
                    confidence = form['confidence']
                    next_review = form['next_review']
                    user = form['user']
                    word = form['word']
                    focus = form['focus']
                    ##baaaaaaaaad below

                    thing = session_words.get(word = word)
                    thing.confidence = confidence
                    thing.next_review = next_review
                    thing.save()
                formset.save()
                return redirect('wordlist')
        else:
            formset = form

        #Below is logic to check if there are week words available. This allows us to show or not show the early weekend modal.
        if week_words.count() > 0:
            has_week_words = True
        else:
            has_week_words = False
        
        
        context = {"session_words": session_words, "formset": formset, "lang": lang, "hasWeekWords": has_week_words}
        return render(request, "app/card-test.html", context)
    else:
        return redirect('login')

@login_required(login_url='raselraju')
@user_passes_test(member_check, login_url='raselraju')
def sentencetest(request):
    if request.user.is_authenticated:
        today = datetime.date.today()
        focus_words = vocabulary.objects.filter(user = request.user).filter(focus__gt = today)[:10] #the set of words the user is focusing on this week
        week_words = dictionary.objects.exclude(dict_words__user=request.user)[:10] #a fresh set of words that the user has not seen before
        refresher_words = vocabulary.objects.filter(user = request.user).filter(focus__lt = today).order_by('next_review')[:5] #words that the user has seen before and is refreshing on
        extra_refresher_words = vocabulary.objects.filter(user = request.user).filter(focus__lt = today).order_by('next_review')[:15] #refresher words, but more of them - for when users has no focus or week words

        if focus_words:
            session_words = focus_words | refresher_words
            session_words = session_words.order_by('-word_id')
        else:
            if week_words:
                return redirect('wordlist')
            else:
                session_words = focus_words | extra_refresher_words #including focus words here fools django that this is a query, not a slice, so I can sort it again
                session_words = session_words.order_by('-word_id') #i don't entirely remember, but I think this was so that things match up correctly in the front end
                print(session_words)

        context = {"session_words": session_words}
        return render(request, "app/sentence-test.html", context)
    else:
        return redirect('login')


@login_required(login_url='raselraju')
@user_passes_test(member_check, login_url='raselraju')
def testselect(request):
    if request.user.is_authenticated:
        words_learned_count =  vocabulary.objects.filter(user = request.user).filter(confidence__gt = 6).count()
        print(words_learned_count)
        context = {"words_learned_count": words_learned_count}
        return render(request, "app/test-select.html", context)
    else:
        return redirect('raselraju')

def raselraju(request):
    context = {}
    return render(request, "app/raselraju.html", context)

