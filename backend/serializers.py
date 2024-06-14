
from rest_framework import serializers

from backend import models
from backend.models import UserInput, SentimentEmotion, AverageWeekScores, AverageMonthScores
from backend.nlp_utils import analyze_text


class UserInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInput
        fields = '__all__'

    def save(self, **kwargs):
        instance = super().save(**kwargs)
        features_to_analyze = {"sentiment": {}, "emotion": {}}
        result = analyze_text(instance.text, features_to_analyze)
        print(result)
        models.SentimentEmotion.objects.create(
            user_input=instance,
            sentiment_score=result["sentiment"]["document"]["score"],
            sentiment_label=result["sentiment"]["document"]["label"],
            joy_score=result["emotion"]["document"]["emotion"]["joy"],
            sadness_score=result["emotion"]["document"]["emotion"]["sadness"],
            anger_score=result["emotion"]["document"]["emotion"]["anger"],
            fear_score=result["emotion"]["document"]["emotion"]["fear"],
            disgust_score=result["emotion"]["document"]["emotion"]["disgust"],
        )
        return instance


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
