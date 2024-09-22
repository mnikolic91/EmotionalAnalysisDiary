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

  selectedDetails: any = null;
  emotionData: any[] = [];

  currentData: string = 'inputs';
  destroy$ = new Subject<void>();
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
      this.inputs$.pipe(takeUntil(this.destroy$)).subscribe(inputs => {
        this.apiService.getAllSentimentEmotionData().pipe(takeUntil(this.destroy$)).subscribe(emotionData => {
          const chartSeries = inputs.map(input => {
            const emotionDetails = emotionData.find(emotion => emotion.user_input === input.id);
            if (emotionDetails) {
              return {
                name: new Date(input.date),
                value: emotionDetails.sentiment_score
              };
            } else {
              return null;
            }
          }).filter(dataPoint => dataPoint !== null);
          chartSeries.sort((a, b) => a.name.getTime() - b.name.getTime());
          this.chartData = [
            {
              name: 'Sentiment Score',
              series: chartSeries
            }
          ];
        });
      });
    } else if (dataType === 'averageWeekScores') {
      this.averageWeekScores$.pipe(takeUntil(this.destroy$)).subscribe(weekScores => {
        this.chartData = [
          {
            name: 'Sentiment',
            series: weekScores.map(score => ({
              name: new Date(score.week),
              value: score.avg_sentiment_score
            }))
          }
        ];
      });
    } else if (dataType === 'averageMonthScores') {
      this.averageMonthScores$.pipe(takeUntil(this.destroy$)).subscribe(monthScores => {
        this.chartData = [
          {
            name: 'Sentiment',
            series: monthScores.map(score => ({
              name: new Date(score.month),
              value: score.avg_sentiment_score
            }))
          }
        ];
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
