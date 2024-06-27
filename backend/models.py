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
    user_input = models.OneToOneField(UserInput, on_delete=models.CASCADE)
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



class AverageWeekScores(models.Model):
    week_start_date = models.DateField()
    week_end_date = models.DateField()
    average_sentiment = models.FloatField()
    average_joy_score = models.FloatField()
    average_sadness_score = models.FloatField()
    average_anger_score = models.FloatField()
    average_fear_score = models.FloatField()
    average_disgust_score = models.FloatField()

    class Meta:
        verbose_name = 'average week score'
        verbose_name_plural = 'average weeks scores'

    def __str__(self):
        return self.week_start_date


class AverageMonthScores(models.Model):
    month = models.CharField(max_length=9)
    average_sentiment = models.FloatField()
    average_joy_score = models.FloatField()
    average_sadness_score = models.FloatField()
    average_anger_score = models.FloatField()
    average_fear_score = models.FloatField()
    average_disgust_score = models.FloatField()

    class Meta:
        verbose_name = 'average month score'
        verbose_name_plural = 'average months scores'

    def __str__(self):
        return self.month

