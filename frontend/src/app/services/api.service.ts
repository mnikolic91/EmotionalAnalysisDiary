import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import {UserInput} from '../models/user-input.model';
import {SentimentEmotion} from '../models/sentiment-emotion.model';
import {AverageWeekScores} from '../models/average-week-scores.model';
import {AverageMonthScores} from '../models/average-month-scores.model';
import {Page} from "../models/page";
import {handleErrors} from "../common/api_errors";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  http = inject(HttpClient);
  private USERINPUT_URL='/api/user-input/';

  getUserInputs(paramsObj: { text: string, page?: number, search: string }): Observable<Page<UserInput>> {
    let params = new HttpParams();
    Object.keys(paramsObj).forEach(key => {
      if (Boolean(paramsObj[key])) {
        params = params.append(key, paramsObj[key].toString());
      }
    });
    return this.http.get<Page<UserInput>>(this.USERINPUT_URL, {params}).pipe(
      catchError(err => handleErrors(err))
    );
  }

  getUserInput(): Observable<UserInput[]> {
    return this.http.get<UserInput[]>(`/api/user-input/`);
  }

  createUserInput(userInput: UserInput): Observable<UserInput> {
    return this.http.post<UserInput>(`/api/user-input/`, userInput);
  }

  getSentimentEmotions(id: number | undefined): Observable<SentimentEmotion[]> {
    return this.http.get<SentimentEmotion[]>(`/api/sentimentemotion/`);
  }

  getAverageWeekScores(paramsObj: {
    text: string,
    page?: number,
    search: string
  }): Observable<Page<AverageWeekScores>> {
    let params = new HttpParams();
    Object.keys(paramsObj).forEach(key => {
      if (Boolean(paramsObj[key])) {
        params = params.append(key, paramsObj[key].toString());
      }
    });
    return this.http.get<Page<AverageWeekScores>>(`/api/averageweek/`, {params}).pipe(
      catchError(err => handleErrors(err))
    );
  }

  getAverageWeekScore(): Observable<AverageWeekScores[]> {
    return this.http.get<AverageWeekScores[]>(`/api/averageweek/`);
  }

  getAverageMonthScores(paramsObj: {
    text: string,
    page?: number,
    search: string
  }): Observable<Page<AverageMonthScores>> {
    let params = new HttpParams();
    Object.keys(paramsObj).forEach(key => {
      if (Boolean(paramsObj[key])) {
        params = params.append(key, paramsObj[key].toString());
      }
    });
    return this.http.get<Page<AverageMonthScores>>(`/api/averagemonth/`, {params}).pipe(
      catchError(err => handleErrors(err))
    );
  }

  getAverageMonthScore(): Observable<AverageMonthScores[]> {
    return this.http.get<AverageMonthScores[]>(`/api/averagemonth/`);
  }
}
