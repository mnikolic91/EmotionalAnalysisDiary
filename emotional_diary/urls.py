from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.decorators.cache import never_cache
from django.views.generic import TemplateView

from backend import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('backend.urls')),
    path('api-auth/', include('rest_framework.urls')),
    # path('nlp-analysis/', views.NLPAnalysisView.as_view(), name='nlp-analysis'),
]
