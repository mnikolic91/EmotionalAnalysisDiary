from django.db import models
from django.utils import timezone

class UserInput(models.Model):
    text = models.TextField()
    date = models.DateTimeField(default=timezone.now)

    class Meta:
        verbose_name = 'user input'
        verbose_name_plural = 'user inputs'

    def __str__(self):
        return self.text


class SentimentEmotion(models.Model):
    user_input = models.ForeignKey(UserInput, on_delete=models.CASCADE)
    sentiment_score = models.FloatField()
    sentiment_label = models.CharField(max_length=20)
    joy_score = models.FloatField()
    sadness_score = models.FloatField()
    anger_score = models.FloatField()
    fear_score = models.FloatField()
    disgust_score = models.FloatField()

    class Meta:
        verbose_name = 'sentiment emotion'
        verbose_name_plural = 'sentiments emotions'

    def __str__(self):
        return self.user_input.text

