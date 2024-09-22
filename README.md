# Emotional Analysis Diary

## Overview

The **Emotional Analysis Diary** is a full-stack web application developed as part of a Bachelor's degree project at the **University of Zadar**. This project explores the intersection of psychology and artificial intelligence (AI), demonstrating the potential of AI in monitoring and analyzing users' emotional states.

The application utilizes **IBM Watson Natural Language Processing (NLP)** to analyze users' textual inputs and return insights about their emotional states. This project was created in collaboration with **IBM Watson**, combining modern frontend and backend technologies to ensure a robust, user-friendly platform for emotional tracking and self-reflection.

## Key Features

- **User Input**: Users can input diary entries (text) through an intuitive UI.
- **Sentiment & Emotion Analysis**: Each entry is analyzed using IBM Watson NLU to determine sentiment (positive, negative, neutral) and emotion scores (joy, sadness, anger, fear, disgust).
- **Data Visualization**: The analyzed emotional data is presented back to the user through various visualizations (charts and graphs).
- **Long-term Emotional Tracking**: Users can track their emotional states over weeks and months.

## Technologies Used

### Frontend:
- **Angular** (HTML, CSS, TypeScript)
- **ngx-charts** (for data visualization)

### Backend:
- **Django REST Framework** (Python)
- **SQLite** (local database)

### AI Integration:
- **IBM Watson Natural Language Understanding (NLU)** for sentiment and emotion analysis.

## Installation and Setup

To run the **Emotional Analysis Diary** locally, follow these steps:

### Prerequisites:
- **Node.js** and **npm** (for Angular frontend)
- **Python** and **pip** (for Django backend)
- An **IBM Watson NLU API key** (refer to [IBM Watson documentation](https://www.ibm.com/cloud/watson-natural-language-understanding) for how to obtain this).

### Backend (Django):
1. Clone the repository:
   ```bash
   git clone https://github.com/mnikolic91/EmotionalAnalysisDiary.git
   cd EmotionalAnalysisDiary/backend
2. Install Python dependencies:
    ```bash
    pip install -r requirements.txt
3. Create a .env file for your secret keys and Watson credentials:
    ```bash
    touch .env
Inside the .env file, include:

    SECRET_KEY=your-django-secret-key
    WATSON_API_KEY=your-watson-api-key
    WATSON_URL=https://api.your-region.natural-language-understanding.watson.cloud.ibm.com/instances/your-instance-id

4. Run migrations and start the Django server:
   ```bash
   python manage.py migrate
   python manage.py runserver
### Frontend (Angular):
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
2. Install Node.js dependencies:
   ```bash
   npm install
3. Start the Angular development server:
   ```bash
   ng serve
The application should now be accessible at http://localhost:4200.


## IBM Watson Integration

The backend of this application interacts with IBM Watson's **Natural Language Understanding (NLU)** API to analyze user inputs. The results include sentiment analysis and emotional scores for joy, sadness, anger, fear, and disgust. These results are then stored and displayed for users in a graphical format using **ngx-charts** in Angular.

### How to Obtain an IBM Watson API Key

To integrate Watson NLU into your version of this project, you will need to:

1. Sign up for an account at [IBM Cloud](https://cloud.ibm.com/).
2. Create a new instance of **Natural Language Understanding**.
3. Obtain your **API key** and **service URL**.
4. Add these credentials to your `.env` file as shown in the setup instructions.

## Usage

Once the application is set up, users can:

- Input their thoughts and emotions in the form of text.
- Receive real-time feedback on their emotional state through AI-powered analysis.
- Track emotional patterns over time, using weekly and monthly summaries visualized in charts.


## Contribution

If you wish to contribute to this project, feel free to submit a pull request or open an issue in the [GitHub repository](https://github.com/mnikolic91/EmotionalAnalysisDiary).


## Acknowledgments

Special thanks to **IBM Watson** for providing the AI tools used in this project, and to the **University of Zadar**, mentor **mag. ing. Niko Vrdoljak** for guidance throughout the project.

