import os
from ibm_watson import NaturalLanguageUnderstandingV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

# Mock API key and URL - please add your own values
api_key = os.getenv('IBM_API_KEY', 'your-ibm-api-key')
service_url = os.getenv('IBM_SERVICE_URL', 'your-service-url')

authenticator = IAMAuthenticator(api_key)
natural_language_understanding = NaturalLanguageUnderstandingV1(
    version='2022-04-07',
    authenticator=authenticator
)
natural_language_understanding.set_service_url(service_url)
natural_language_understanding.set_disable_ssl_verification(True)


def analyze_text(text, features):
    response = natural_language_understanding.analyze(
        text=text,
        features=features
    ).get_result()

    return response
