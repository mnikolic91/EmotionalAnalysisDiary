from django.contrib import admin
from backend.models import UserInput, SentimentEmotion

# Register your models here.
admin.site.register([
    UserInput,
    SentimentEmotion,

])
