import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserInput} from '../models/user-input.model';
import {SentimentEmotion} from '../models/sentiment-emotion.model';
import {AverageWeekScores} from '../models/average-week-scores.model';
import {AverageMonthScores} from '../models/average-month-scores.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/api';

  http= inject(HttpClient)


  getUserInputs(): Observable<UserInput[]> {
    return this.http.get<UserInput[]>(`${this.apiUrl}/user-inputs`);
  }

  createUserInput(userInput: UserInput): Observable<UserInput> {
    return this.http.post<UserInput>(`${this.apiUrl}/user-inputs`, userInput);
  }

  getSentimentEmotions(): Observable<SentimentEmotion[]> {
    return this.http.get<SentimentEmotion[]>(`${this.apiUrl}/sentiment-emotions`);
  }

  getAverageWeekScores(): Observable<AverageWeekScores[]> {
    return this.http.get<AverageWeekScores[]>(`${this.apiUrl}/average-week-scores`);
  }

  getAverageMonthScores(): Observable<AverageMonthScores[]> {
    return this.http.get<AverageMonthScores[]>(`${this.apiUrl}/average-month-scores`);
  }
}
