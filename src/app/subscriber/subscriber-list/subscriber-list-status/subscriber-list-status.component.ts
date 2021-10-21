import { Component, Input, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { PreferencesService } from '../../../core/preferences.service';
import { Subscriber } from '../../subscriber.model';
import { SubscriberListStatusService } from './subscriber-list-status.service';

@Component({
  selector: 'app-subscriber-list-status',
  templateUrl: './subscriber-list-status.component.html',
  styleUrls: ['./subscriber-list-status.component.scss']
})
export class SubscriberListStatusComponent
  implements AfterViewInit {
  //implements OnInit {

  @Input()
  status: string;

  subscribers$: Observable<Subscriber[]>;

  loading = new BehaviorSubject(false);
  totalResults: number = 0;
  displayedColumns = ['actions', 'id', 'employeeId', 'name', 'surname', 'email', 'subscriptions', 'notifications'];
  filters: any = {};

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    public service: SubscriberListStatusService,
    public preferencesService: PreferencesService
  ) { }

  ngAfterViewInit(): void {
  //ngOnInit(): void {

    this.filters = this.preferencesService.subscriberList[this.status].filters;

    this.paginator.pageIndex = this.preferencesService.subscriberList[this.status].pageIndex;
    this.paginator.pageSize = this.preferencesService.subscriberList[this.status].pageSize;
    this.getDataPage(this.paginator.pageIndex, this.paginator.pageSize);
  }

  getDataPage(pageIndex: number, pageSize: number): void {

    this.loading.next(true);
    this.cdr.detectChanges();

    this.filters['active'] = (this.isActiveStatus() ? '1' : '0');

    this.preferencesService.subscriberList[this.status].pageIndex = pageIndex;
    this.preferencesService.subscriberList[this.status].pageSize = pageSize;

    this.subscribers$ = this.service.getSubscribers(pageIndex + 1, pageSize, this.buildQuery()).pipe(
      tap(res => {
        this.totalResults = res['total']
      }),
      map(res => res['children'])
    );

    this.loading.next(false);
  }

  onChangePage(event: PageEvent) {
    this.getDataPage(event.pageIndex, event.pageSize);
  }

  onChangeFilter(value): void {
    this.paginator.firstPage();
    this.getDataPage(this.paginator.pageIndex, this.paginator.pageSize);
  }

  buildQuery(): any {
  
    const query = {};
  
    for (const filter in this.filters) {
  
      if (this.filters.hasOwnProperty(filter)) {
  
        const value = this.filters[filter];
  
        if (value && value !== '') {
          query[filter] = this.filters[filter];
        }
      }
    }
  
    return query;
  }

  clickResetFilters(): void {
    this.filters = {};
    this.onChangeFilter(null);
  }

  private isActiveStatus(): boolean {
    return this.status === 'active'
  }

  newSubscriber(): void {
    this.service.newSubscriber().subscribe(
      subscriber => this.router.navigate(['/subscriber', subscriber._id])
    )
  }
}
