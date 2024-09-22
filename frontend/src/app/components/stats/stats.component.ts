import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
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
  currentChartType: string = 'sentiment';
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
    this.updateChartData();
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
    this.updateChartData();
  }

  setChartType(chartType: string): void {
    this.currentChartType = chartType;
    this.updateChartData();
  }

  updateChartData(): void {
    if (this.currentData === 'inputs') {
      this.inputs$.pipe(takeUntil(this.destroy$)).subscribe(inputs => {
        this.apiService.getAllSentimentEmotionData().pipe(takeUntil(this.destroy$)).subscribe(emotionData => {
          if (this.currentChartType === 'sentiment') {
            const chartSeries = inputs.map(input => {
              const emotionDetails = emotionData.find(emotion => emotion.user_input === input.id);
              return emotionDetails ? {
                name: new Date(input.date),
                value: emotionDetails.sentiment_score
              } : null;
            }).filter(dataPoint => dataPoint !== null);

            chartSeries.sort((a, b) => a.name.getTime() - b.name.getTime());
            this.chartData = [{
              name: 'Sentiment Score',
              series: chartSeries
            }];
          } else if (this.currentChartType === 'emotion') {
            const emotions = ['joy_score', 'sadness_score', 'anger_score', 'fear_score', 'disgust_score'];
            this.chartData = emotions.map(emotion => ({
              name: emotion.replace('_score', '').charAt(0).toUpperCase() + emotion.replace('_score', '').slice(1),
              series: inputs.map(input => {
                const emotionDetails = emotionData.find(emotionData => emotionData.user_input === input.id);
                return emotionDetails ? {
                  name: new Date(input.date),
                  value: emotionDetails[emotion]
                } : null;
              }).filter(dataPoint => dataPoint !== null)
            }));

            this.chartData.forEach(series => {
              series.series.sort((a, b) => a.name.getTime() - b.name.getTime());
            });
          }
        });
      });
    } else if (this.currentData === 'averageWeekScores') {
      this.averageWeekScores$.pipe(takeUntil(this.destroy$)).subscribe(weekScores => {
        if (this.currentChartType === 'sentiment') {
          this.chartData = [{
            name: 'Sentiment',
            series: weekScores.map(score => ({
              name: new Date(score.week),
              value: score.avg_sentiment_score
            }))
          }];
        } else if (this.currentChartType === 'emotion') {
          const emotions = ['avg_joy_score', 'avg_sadness_score', 'avg_anger_score', 'avg_fear_score', 'avg_disgust_score'];
          this.chartData = emotions.map(emotion => ({
            name: emotion.replace('avg_', '').replace('_score', '').charAt(0).toUpperCase() + emotion.replace('avg_', '').replace('_score', '').slice(1),
            series: weekScores.map(score => ({
              name: new Date(score.week),
              value: score[emotion]
            }))
          }));
        }
      });
    } else if (this.currentData === 'averageMonthScores') {
      this.averageMonthScores$.pipe(takeUntil(this.destroy$)).subscribe(monthScores => {
        if (this.currentChartType === 'sentiment') {
          this.chartData = [{
            name: 'Sentiment',
            series: monthScores.map(score => ({
              name: new Date(score.month),
              value: score.avg_sentiment_score
            }))
          }];
        } else if (this.currentChartType === 'emotion') {
          const emotions = ['avg_joy_score', 'avg_sadness_score', 'avg_anger_score', 'avg_fear_score', 'avg_disgust_score'];
          this.chartData = emotions.map(emotion => ({
            name: emotion.replace('avg_', '').replace('_score', '').charAt(0).toUpperCase() + emotion.replace('avg_', '').replace('_score', '').slice(1),
            series: monthScores.map(score => ({
              name: new Date(score.month),
              value: score[emotion]
            }))
          }));
        }
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
