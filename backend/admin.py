from django.contrib import admin
from backend.models import UserInput, SentimentEmotion, AverageWeekScores, AverageMonthScores

# Register your models here.
admin.site.register([
    UserInput,
    SentimentEmotion,
    AverageWeekScores,
    AverageMonthScores
])
