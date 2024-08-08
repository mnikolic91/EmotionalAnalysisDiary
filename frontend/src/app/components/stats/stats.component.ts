import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {AsyncPipe, DatePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {NgbModal, NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../../services/api.service';
import {delay, Observable, share, Subject, takeUntil} from 'rxjs';
import {UserInput} from '../../models/user-input.model';
import {TruncateWordsPipe} from "../../truncate-words.pipe";
import {AverageWeekScores} from '../../models/average-week-scores.model';
import {AverageMonthScores} from '../../models/average-month-scores.model';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {EmotionStatsModalComponent} from "../emotion-stats-modal/emotion-stats-modal.component";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
  imports: [
    RouterLink, NgbPagination, AsyncPipe, DatePipe, ReactiveFormsModule, TruncateWordsPipe, NgxChartsModule
  ],
  standalone: true
})
export class StatsComponent implements OnInit, OnDestroy {
  apiService = inject(ApiService);
  modalService = inject(NgbModal);

  inputs$: Observable<UserInput[]>;
  averageWeekScores$: Observable<AverageWeekScores[]>;
  averageMonthScores$: Observable<AverageMonthScores[]>;
  selectedItemDetails$: Observable<any>;

  selectedDetails: any = null;
  sentimentData: any[] = [];
  emotionData: any[] = [];

  currentData: string = 'inputs';
  destroy$ = new Subject<void>();
  searchInput = new FormControl('');
  page = 1;

  view: [number, number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Score';
  animations = true;
  chartData: any[] = [];


  ngOnInit(): void {
    this.getUserInputs({page: this.page});
    this.getAverageWeekScores({page: this.page});
    this.getAverageMonthScores({page: this.page});
    this.updateChartData('inputs');
    this.loadEmotionData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadEmotionData(): void {
    this.apiService.getAllSentimentEmotionData().subscribe(data => {
      this.emotionData = data;
      console.log(this.emotionData);
    });
  }

  getUserInputs(param: { page: number }): void {
    this.inputs$ = this.apiService.getUserInputs(param).pipe(
      delay(200),
      share()
    );
  }

  getAverageWeekScores(param: { page: number }): void {
    this.averageWeekScores$ = this.apiService.getAverageWeekScores(param).pipe(
      delay(200),
      share()
    );
  }

  getAverageMonthScores(param: { page: number }): void {
    this.averageMonthScores$ = this.apiService.getAverageMonthScores(param).pipe(
      delay(200),
      share()
    );
  }

  showData(dataType: string): void {
    this.currentData = dataType;
    this.updateChartData(dataType);
  }

  updateChartData(dataType: string): void {
    if (dataType === 'inputs') {
      this.inputs$.subscribe(data => {
        this.chartData = data.map(input => ({
          name: input.date,
          value: input.text.length
        }));
      });
    } else if (dataType === 'averageWeekScores') {
      this.averageWeekScores$.subscribe(data => {
        this.chartData = data.map(score => ({
          name: score.week,
          value: score.avg_sentiment_score
        }));
      });
    } else if (dataType === 'averageMonthScores') {
      this.averageMonthScores$.subscribe(data => {
        this.chartData = data.map(score => ({
          name: score.month,
          value: score.avg_sentiment_score
        }));
      });
    }
  }

  showDetails(id: number | string): void {
    if (this.currentData === 'inputs') {
      this.inputs$.pipe(takeUntil(this.destroy$)).subscribe(data => {
        const inputDetails = data.find(input => input.id === id);
        if (inputDetails) {
          this.selectedDetails = inputDetails;

          this.apiService.getAllSentimentEmotionData().pipe(takeUntil(this.destroy$)).subscribe(emotionData => {
            const emotionDetails = emotionData.find(emotion => emotion.user_input === inputDetails.id);

            if (emotionDetails) {
              const sentimentLabel = emotionDetails.sentiment_label;
              const sentimentScore = emotionDetails.sentiment_score;
              const emotionDataChart = [
                {name: 'Joy', value: emotionDetails.joy_score},
                {name: 'Sadness', value: emotionDetails.sadness_score},
                {name: 'Anger', value: emotionDetails.anger_score},
                {name: 'Fear', value: emotionDetails.fear_score},
                {name: 'Disgust', value: emotionDetails.disgust_score}
              ];

              this.apiService.getSentimentEmotionByUserInputId(emotionDetails.id).pipe(takeUntil(this.destroy$)).subscribe(() => {
                this.openModal(sentimentLabel, sentimentScore, emotionDataChart, inputDetails.text);
              });
            }
          });
        }
      });
    } else if (this.currentData === 'averageWeekScores') {
      this.averageWeekScores$.subscribe(data => {
        const details = data.find(score => score.week === id);
        if (details) {
          this.selectedDetails = details;
          this.sentimentData = [{
            name: 'Week',
            series: [
              {name: details.week, value: details.avg_sentiment_score}
            ]
          }];
          this.emotionData = [
            {name: 'Joy', value: details.avg_joy_score},
            {name: 'Sadness', value: details.avg_sadness_score},
            {name: 'Anger', value: details.avg_anger_score},
            {name: 'Fear', value: details.avg_fear_score},
            {name: 'Disgust', value: details.avg_disgust_score}
          ];
        }
      });
    } else if (this.currentData === 'averageMonthScores') {
      this.averageMonthScores$.subscribe(data => {
        const details = data.find(score => score.month === id);
        if (details) {
          this.selectedDetails = details;
          this.sentimentData = [{
            name: 'Month',
            series: [
              {name: details.month, value: details.avg_sentiment_score}
            ]
          }];
          this.emotionData = [
            {name: 'Joy', value: details.avg_joy_score},
            {name: 'Sadness', value: details.avg_sadness_score},
            {name: 'Anger', value: details.avg_anger_score},
            {name: 'Fear', value: details.avg_fear_score},
            {name: 'Disgust', value: details.avg_disgust_score}
          ];
        }
      });
    }
  }

  openModal(sentimentLabel: string, sentimentScore: number, emotionData: any[], fullText: string = '') {
    const modalRef = this.modalService.open(EmotionStatsModalComponent, {size: 'lg'});
    modalRef.componentInstance.sentimentLabel = sentimentLabel;
    modalRef.componentInstance.sentimentScore = sentimentScore;
    modalRef.componentInstance.emotionData = emotionData;
    modalRef.componentInstance.fullText = fullText;
  }

}
