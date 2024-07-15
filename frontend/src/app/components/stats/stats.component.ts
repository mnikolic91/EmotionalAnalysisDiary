import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/api.service';
import {debounce, delay, Observable, share, startWith, Subject, takeUntil, tap, timer} from 'rxjs';
import { UserInput } from '../../models/user-input.model';
import { Page } from '../../models/page';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
  imports: [
    RouterLink, NgbPagination, AsyncPipe, DatePipe, ReactiveFormsModule
  ],
  standalone: true
})
export class StatsComponent implements OnInit, OnDestroy {
  apiService = inject(ApiService);
  route = inject(ActivatedRoute);

  inputs$: Observable<Page<UserInput>>;
  destroy$ = new Subject<void>();
  searchInput = new FormControl('');
  searchLoading = false;
  page = 1;
  pageSize = 20;
  inputId: string;

  ngOnInit(): void {
    this.getUserInputs({ text: '', page: this.page, search: this.searchInput.value });
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

    filterInputs(): void {
    this.searchInput.valueChanges.pipe(
      takeUntil(this.destroy$.asObservable()),
      tap(() => this.searchLoading = true),
      startWith(this.searchInput.value),
      debounce(() => this.searchInput.value !== null ? timer(600) : timer(0)),
      tap(() => this.searchLoading = false)
    ).subscribe(searchText => {
      this.page = 1;
      this.getUserInputs({text: this.inputId, page: null, search: searchText});
    });
  }

  removeSearch(): void {
    this.searchInput.setValue('');
    this.getUserInputs({ text: '', page: this.page, search: '' });
  }

  trackById(index: number, item: UserInput): number {
    return item.id;
  }
}
