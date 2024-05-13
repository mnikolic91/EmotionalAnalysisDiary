from rest_framework import viewsets
from .models import User, UserInput, SentimentEmotion, AverageWeekScores, AverageMonthScores
from emotional_diary.serializers import UserSerializer, UserInputSerializer, SentimentEmotionSerializer, AverageWeekScoresSerializer, AverageMonthScoresSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

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
