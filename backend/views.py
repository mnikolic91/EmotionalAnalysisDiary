from rest_framework import viewsets

from .models import UserInput, SentimentEmotion, AverageWeekScores, AverageMonthScores
from backend.serializers import UserInputCreateSerializer, SentimentEmotionSerializer, AverageWeekScoresSerializer, \
    AverageMonthScoresSerializer, UserInputSerializer


class UserInputViewSet(viewsets.ModelViewSet):
    queryset = UserInput.objects.all()

    def get_serializer_class(self):
        if self.action == 'create':
            return UserInputCreateSerializer
        else:
            return UserInputSerializer



class SentimentEmotionViewSet(viewsets.ModelViewSet):
    queryset = SentimentEmotion.objects.all()
    serializer_class = SentimentEmotionSerializer


class AverageWeekScoresViewSet(viewsets.ModelViewSet):
    queryset = AverageWeekScores.objects.all()
    serializer_class = AverageWeekScoresSerializer


class AverageMonthScoresViewSet(viewsets.ModelViewSet):
    queryset = AverageMonthScores.objects.all()
    serializer_class = AverageMonthScoresSerializer
