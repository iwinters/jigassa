from django import forms
from django.forms import modelformset_factory, BaseModelFormSet, formset_factory
from .models import vocabulary
import datetime

# for cardtest

today = datetime.date.today()



class QueriedVocabularyFormSet(BaseModelFormSet):
    def __init__(self, user, *args, **kwargs):
        super().__init__(*args, **kwargs)
        focus_words = vocabulary.objects.filter(user = user).filter(focus__gt = today)[:10]
        print(focus_words)


        refresher_words = vocabulary.objects.filter(user = user).filter(focus__lt = today).order_by('next_review')[:5]
        print(refresher_words)
        session_words = focus_words | refresher_words
        self.queryset = session_words.order_by('-word_id')
        print(session_words)
        print( "hairnet")
        print(self.queryset)
        print("qs")

VocabularyFormSet = modelformset_factory(vocabulary, fields=("id", "user", "word", "confidence", "next_review", "focus"), extra=0, formset = QueriedVocabularyFormSet)


# for wordlist

class WordListForm(forms.Form):
    
    word = forms.CharField()
    

WordListFormSet = formset_factory(WordListForm, extra = 10)