from rest_framework import viewsets
from .models import  UserInput, SentimentEmotion, AverageWeekScores, AverageMonthScores
from emotional_diary.serializers import UserInputSerializer, SentimentEmotionSerializer, AverageWeekScoresSerializer, AverageMonthScoresSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .nlp_utils import analyze_text


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


class NLPAnalysisView(APIView):
    def post(self, request):
        text = request.data.get('text')
        features = request.data.get('features', {'sentiment': {}, 'emotion': {}})

        result = analyze_text(text, features)

        return Response(result)
