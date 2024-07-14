from django.db import models
from django.utils import timezone
from django.db.models import Avg
from django.db.models.functions import TruncWeek, TruncMonth

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

    @staticmethod
    def average_by_week():
        return SentimentEmotion.objects.annotate(week=TruncWeek('user_input__date')).values('week').annotate(
            avg_sentiment_score=Avg('sentiment_score'),
            avg_joy_score=Avg('joy_score'),
            avg_sadness_score=Avg('sadness_score'),
            avg_anger_score=Avg('anger_score'),
            avg_fear_score=Avg('fear_score'),
            avg_disgust_score=Avg('disgust_score')
        ).order_by('week')

    @staticmethod
    def average_by_month():
        return SentimentEmotion.objects.annotate(month=TruncMonth('user_input__date')).values('month').annotate(
            avg_sentiment_score=Avg('sentiment_score'),
            avg_joy_score=Avg('joy_score'),
            avg_sadness_score=Avg('sadness_score'),
            avg_anger_score=Avg('anger_score'),
            avg_fear_score=Avg('fear_score'),
            avg_disgust_score=Avg('disgust_score')
        ).order_by('month')
