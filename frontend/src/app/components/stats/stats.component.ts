import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/api.service';
import { delay, Observable, share, Subject } from 'rxjs';
import { UserInput } from '../../models/user-input.model';
import { TruncateWordsPipe } from "../../truncate-words.pipe";
import { AverageWeekScores } from '../../models/average-week-scores.model';
import { AverageMonthScores } from '../../models/average-month-scores.model';
import {NgxChartsModule} from "@swimlane/ngx-charts";

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

  inputs$: Observable<UserInput[]>;
  averageWeekScores$: Observable<AverageWeekScores[]>;
  averageMonthScores$: Observable<AverageMonthScores[]>;

  currentData: string = 'inputs';  // Default to 'inputs'
  destroy$ = new Subject<void>();
  searchInput = new FormControl('');
  page = 1;

  // Variables for ngx-charts
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
    this.updateChartData('inputs'); // Initialize chart with default data
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getUserInputs(param: { page: number}): void {
    this.inputs$ = this.apiService.getUserInputs(param).pipe(
      delay(200),
      share()
    );
  }

  getAverageWeekScores(param: { page: number}): void {
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
    this.updateChartData(dataType); // Update chart data on button click
  }

  updateChartData(dataType: string): void {
    if (dataType === 'inputs') {
      this.inputs$.subscribe(data => {
        this.chartData = data.map(input => ({
          name: input.date,
          value: input.text.length // Or some other metric you want to visualize
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

}
