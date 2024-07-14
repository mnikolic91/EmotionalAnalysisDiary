from rest_framework import serializers
from rest_framework.utils.serializer_helpers import ReturnDict
from backend import models
from backend.models import UserInput, SentimentEmotion
from backend.nlp_utils import analyze_text
from datetime import datetime

class DateField(serializers.DateField):
    def to_representation(self, value):
        if isinstance(value, datetime):
            value = value.date()
        return super().to_representation(value)

class UserInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInput
        fields = ['id', 'text', 'date']

class UserInputCreateSerializer(serializers.Serializer):
    text = serializers.CharField()

    def create(self, validated_data):
        instance = UserInput.objects.create(text=validated_data['text'])
        features_to_analyze = {"sentiment": {}, "emotion": {}}
        result = analyze_text(instance.text, features_to_analyze)
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

    @property
    def data(self):
        instance = self.instance
        if not instance:
            return ReturnDict({}, serializer=self)
        emotion_instance = instance.sentimentemotion_set.first()
        return {'id': instance.id, 'text': instance.text, 'emotion_id': emotion_instance.id,
                'sentiment_score': emotion_instance.sentiment_score, 'sentiment_label': emotion_instance.sentiment_label,
                'joy_score': emotion_instance.joy_score, 'sadness_score': emotion_instance.sadness_score, 'anger_score': emotion_instance.anger_score,
                'fear_score': emotion_instance.fear_score, 'disgust_score': emotion_instance.disgust_score}

class SentimentEmotionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SentimentEmotion
        fields = '__all__'

class WeeklyAverageSerializer(serializers.Serializer):
    week = DateField()
    avg_sentiment_score = serializers.FloatField()
    avg_joy_score = serializers.FloatField()
    avg_sadness_score = serializers.FloatField()
    avg_anger_score = serializers.FloatField()
    avg_fear_score = serializers.FloatField()
    avg_disgust_score = serializers.FloatField()

class MonthlyAverageSerializer(serializers.Serializer):
    month = DateField()
    avg_sentiment_score = serializers.FloatField()
    avg_joy_score = serializers.FloatField()
    avg_sadness_score = serializers.FloatField()
    avg_anger_score = serializers.FloatField()
    avg_fear_score = serializers.FloatField()
    avg_disgust_score = serializers.FloatField()
