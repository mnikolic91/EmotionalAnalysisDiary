from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import UserInput, SentimentEmotion, AverageWeekScores, AverageMonthScores
from backend.serializers import UserInputSerializer, SentimentEmotionSerializer, AverageWeekScoresSerializer, \
    AverageMonthScoresSerializer


class UserInputViewSet(viewsets.ModelViewSet):
    queryset = UserInput.objects.all()
    serializer_class = UserInputSerializer


class SentimentEmotionViewSet(viewsets.ModelViewSet):
    queryset = SentimentEmotion.objects.all()
    serializer_class = SentimentEmotionSerializer


class AverageWeekScoresViewSet(viewsets.ModelViewSet):
    queryset = AverageWeekScores.objects.all()
    serializer_class = AverageWeekScoresSerializer


class AverageMonthScoresViewSet(viewsets.ModelViewSet):
    queryset = AverageMonthScores.objects.all()
    serializer_class = AverageMonthScoresSerializer
