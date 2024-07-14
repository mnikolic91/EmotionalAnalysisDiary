from rest_framework import routers

from backend import views

router = routers.DefaultRouter()
router.register('user-input', views.UserInputViewSet)
router.register('sentimentemotion', views.SentimentEmotionViewSet)
