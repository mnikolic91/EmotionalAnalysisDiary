import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import {UserInput} from '../models/user-input.model';
import {SentimentEmotion} from '../models/sentiment-emotion.model';
import {AverageWeekScores} from '../models/average-week-scores.model';
import {AverageMonthScores} from '../models/average-month-scores.model';
import {handleErrors} from "../common/api_errors";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  http = inject(HttpClient);
  private USERINPUT_URL = '/api/user-input/';
  private SENTIMENT_EMOTION_URL = '/api/sentimentemotion/';
  private AVERAGE_WEEK_URL = '/api/averageweek/';
  private AVERAGE_MONTH_URL = '/api/averagemonth/';

  getUserInputs(paramsObj: { page?: number }): Observable<UserInput[]> {
    let params = new HttpParams();
    Object.keys(paramsObj).forEach(key => {
      if (Boolean(paramsObj[key])) {
        params = params.append(key, paramsObj[key].toString());
      }
    });
    return this.http.get<UserInput[]>(this.USERINPUT_URL, {params}).pipe(
      catchError(err => handleErrors(err))
    );
  }

  getSentimentEmotionByUserInputId(userInputId: number): Observable<SentimentEmotion[]> {
    return this.http.get<SentimentEmotion[]>(`${this.SENTIMENT_EMOTION_URL}${userInputId}`).pipe(
      catchError(err => handleErrors(err))
    );
  }

  getAllSentimentEmotionData(): Observable<SentimentEmotion[]> {
    return this.http.get<SentimentEmotion[]>(this.SENTIMENT_EMOTION_URL);
  }

  createUserInput(userInput: UserInput): Observable<UserInput> {
    return this.http.post<UserInput>(this.USERINPUT_URL, userInput);
  }

  getAverageWeekScores(paramsObj: { page?: number }): Observable<AverageWeekScores[]> {
    let params = new HttpParams();
    Object.keys(paramsObj).forEach(key => {
      if (Boolean(paramsObj[key])) {
        params = params.append(key, paramsObj[key].toString());
      }
    });
    return this.http.get<AverageWeekScores[]>(this.AVERAGE_WEEK_URL, {params}).pipe(
      catchError(err => handleErrors(err))
    );
  }

  getAverageMonthScores(paramsObj: { page?: number }): Observable<AverageMonthScores[]> {
    let params = new HttpParams();
    Object.keys(paramsObj).forEach(key => {
      if (Boolean(paramsObj[key])) {
        params = params.append(key, paramsObj[key].toString());
      }
    });
    return this.http.get<AverageMonthScores[]>(this.AVERAGE_MONTH_URL, {params}).pipe(
      catchError(err => handleErrors(err))
    );
  }
}
