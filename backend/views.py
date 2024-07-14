from rest_framework import viewsets

from .models import UserInput, SentimentEmotion
from backend.serializers import UserInputCreateSerializer, SentimentEmotionSerializer, UserInputSerializer


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

