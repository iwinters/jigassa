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


        focus_words = vocabulary.objects.filter(user = user).filter(focus__gt = today)[:10]
        refresher_words = vocabulary.objects.filter(user = user).filter(focus__lt = today).order_by('next_review')[:5] #words that the user has seen before and is refreshing on
        extra_refresher_words = vocabulary.objects.filter(user = user).filter(focus__lt = today).order_by('next_review')[:15] #refresher words, but more of them - for when users has no focus or week words
        if focus_words:
                    session_words = focus_words | refresher_words
                    session_words = session_words.order_by('-word_id')
        else:
            session_words = focus_words | extra_refresher_words #including focus words here fools django that this is a query, not a slice, so I can sort it again
            session_words = session_words.order_by('-word_id') #i don't entirely remember, but I think this was so that things match up correctly in the front end
            print(session_words)




        self.queryset = session_words.order_by('-word_id')
        print(session_words)
        print(self.queryset)

VocabularyFormSet = modelformset_factory(vocabulary, fields=("id", "user", "word", "confidence", "next_review", "focus"), extra=0, formset = QueriedVocabularyFormSet)


# for wordlist

class WordListForm(forms.Form):
    
    word = forms.CharField()
    

WordListFormSet = formset_factory(WordListForm, extra = 10)