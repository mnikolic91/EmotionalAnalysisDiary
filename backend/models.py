import uuid

from django.db import models

class User(models.Model):
    id = models.IntegerField(primary_key=True, default=1)
    name = models.CharField(max_length=20, default='User')

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    def __str__(self):
        return self.name


class UserInput(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'user input'
        verbose_name_plural = 'user inputs'

    def __str__(self):
        return self.date


class SentimentEmotion(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_input = models.ForeignKey(UserInput, on_delete=models.CASCADE)
    sentiment_score = models.FloatField()
    joy_score = models.FloatField()
    sadness_score = models.FloatField()
    anger_score = models.FloatField()
    fear_score = models.FloatField()
    disgust_score = models.FloatField()

    class Meta:
        verbose_name = 'sentiment emotion'
        verbose_name_plural = 'sentiments emotions'

    def __str__(self):
        return self.user_input



class AverageWeekScores(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
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
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
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

