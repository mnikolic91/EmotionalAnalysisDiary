import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {AsyncPipe, DatePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../../services/api.service';
import {delay, Observable, share, Subject} from 'rxjs';
import {UserInput} from '../../models/user-input.model';
import {TruncateWordsPipe} from "../../truncate-words.pipe";
import {AverageWeekScores} from '../../models/average-week-scores.model';
import {AverageMonthScores} from '../../models/average-month-scores.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
  imports: [
    RouterLink, NgbPagination, AsyncPipe, DatePipe, ReactiveFormsModule, TruncateWordsPipe
  ],
  standalone: true
})
export class StatsComponent implements OnInit, OnDestroy {
  apiService = inject(ApiService);

  inputs$: Observable<UserInput[]>;
  averageWeekScores$: Observable<AverageWeekScores[]>;
  averageMonthScores$: Observable<AverageMonthScores[]>;


  destroy$ = new Subject<void>();
  searchInput = new FormControl('');
  page = 1;

  ngOnInit(): void {
    this.getUserInputs({page: this.page});
    this.getAverageWeekScores({page: this.page});
    this.getAverageMonthScores({page: this.page});
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
}
