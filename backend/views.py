from rest_framework import viewsets

from .models import UserInput, SentimentEmotion
from rest_framework.response import Response
from rest_framework import status
from backend.serializers import UserInputCreateSerializer, SentimentEmotionSerializer, UserInputSerializer, \
    WeeklyAverageSerializer, MonthlyAverageSerializer


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


class AverageWeekScoresViewSet(viewsets.ViewSet):
    def list(self, request):
        weekly_averages = SentimentEmotion.average_by_week()
        serializer = WeeklyAverageSerializer(weekly_averages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AverageMonthScoresViewSet(viewsets.ViewSet):
    def list(self, request):
        monthly_averages = SentimentEmotion.average_by_month()
        serializer = MonthlyAverageSerializer(monthly_averages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
