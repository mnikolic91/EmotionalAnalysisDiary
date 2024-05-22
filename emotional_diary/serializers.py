from rest_framework import serializers
from backend.models import UserInput, SentimentEmotion, AverageWeekScores, AverageMonthScores


class UserInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInput
        fields = '__all__'

class SentimentEmotionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SentimentEmotion
        fields = '__all__'

class AverageWeekScoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = AverageWeekScores
        fields = '__all__'

class AverageMonthScoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = AverageMonthScores
        fields = '__all__'
