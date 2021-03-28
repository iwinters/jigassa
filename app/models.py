from django.db import models
from django.contrib.auth.models import User

class dictionary(models.Model):
    english = models.CharField(max_length=50)
    bengali = models.CharField(max_length=50)
    level = models.IntegerField(default=5)

    def __str__(self):
        return str(self.english)

class vocabulary(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    word = models.ForeignKey(dictionary, on_delete=models.CASCADE, related_name="dict_words")
    confidence = models.IntegerField(default=0)
    next_review = models.DateField()
    focus = models.DateField()
    
    def __str__(self):
        return str(self.word)
     

