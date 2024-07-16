import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {AsyncPipe, DatePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from '../../services/api.service';
import {delay, Observable, share, Subject, tap} from 'rxjs';
import {UserInput} from '../../models/user-input.model';
import {Page} from '../../models/page';
import {TruncateWordsPipe} from "../../truncate-words.pipe";

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
  destroy$ = new Subject<void>();
  searchInput = new FormControl('');
  page = 1;


  ngOnInit(): void {
    this.getUserInputs({text: '', page: this.page, search: this.searchInput.value});
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getUserInputs(param: { text: string, page: number, search: string }): void {
    this.inputs$ = this.apiService.getUserInputs(param).pipe(
      delay(200),
      share()
    );
  }
}
