from django.contrib import admin
from backend.models import User, UserInput, SentimentEmotion, AverageWeekScores, AverageMonthScores

# Register your models here.
admin.site.register([
    User,
    UserInput,
    SentimentEmotion,
    AverageWeekScores,
    AverageMonthScores
])
