from django.shortcuts import render, redirect
from .models import dictionary, vocabulary
from .forms import VocabularyFormSet, WordListFormSet

import json
from django.core import serializers
import datetime



# Create your views here.
def wordlist(request):
    week_words = dictionary.objects.filter(dict_words=None)[:10]
    context = {"words": week_words}
    return render(request, "app/word-list.html", context)

def addwordlist(request):
    week_words = dictionary.objects.filter(dict_words=None)[:10]
    count = 0
    for word in week_words:
        thing = vocabulary(user = 1, word= week_words[count], confidence = 0, next_review = datetime.date.today(), focus = datetime.date.today() + datetime.timedelta(days=7))
        thing.save()
        count += 1
    return redirect('testselect')


def cardtest(request, lang):
    today = datetime.date.today()
    focus_words = vocabulary.objects.filter(focus__gt = today)

    if focus_words:
        pass
    else:
        return redirect('wordlist')



    refresher_words = vocabulary.objects.filter(focus__lt = today).order_by('next_review')[:5]
    session_words = focus_words | refresher_words
    session_words_json = serializers.serialize("json", session_words)
    form = VocabularyFormSet(queryset = session_words)
    
    if request.method == "POST":
        formset = VocabularyFormSet(request.POST)
        if formset.is_valid():
            for form in formset.cleaned_data:
                #user,word,focus
                confidence = form['confidence']
                next_review = form['next_review']
                user = form['user']
                word = form['word']
                focus = form['focus']
                thing = vocabulary.objects.get(word=form['word'])
                thing.confidence = confidence
                thing.next_review = next_review
                thing.save()
            formset.save()
    else:
        formset = form
    
    
    context = {"session_words": session_words, "session_words_json": session_words_json, "formset": formset, "lang": lang}
    return render(request, "app/card-test.html", context)


def testselect(request):
    context = {}
    return render(request, "app/test-select.html", context)