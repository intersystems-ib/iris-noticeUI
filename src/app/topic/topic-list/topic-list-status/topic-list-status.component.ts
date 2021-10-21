import { Component, Input, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { PreferencesService } from '../../../core/preferences.service';
import { Topic } from '../../topic.model';
import { TopicListStatusService } from './topic-list-status.service';

@Component({
  selector: 'app-topic-list-status',
  templateUrl: './topic-list-status.component.html',
  styleUrls: ['./topic-list-status.component.scss']
})
export class TopicListStatusComponent
  implements AfterViewInit {
  //implements OnInit {

  @Input()
  status: string;

  topics$: Observable<Topic[]>;

  isLoading = false;
  totalResults: number = 0;
  displayedColumns = ['actions', 'id', 'topicKey', 'contactWay', 'format', 'destination', 'botName', 'template', 'notifications'];
  filters: any = {};

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    private cdr: ChangeDetectorRef,
    public service: TopicListStatusService,
    public preferencesService: PreferencesService
  ) { }

  ngAfterViewInit(): void {
  //ngOnInit(): void {

    this.filters = this.preferencesService.topicList[this.status].filters;

    this.paginator.pageIndex = this.preferencesService.topicList[this.status].pageIndex;
    this.paginator.pageSize = this.preferencesService.topicList[this.status].pageSize;
    this.getDataPage(this.paginator.pageIndex, this.paginator.pageSize);
  }

  getDataPage(pageIndex: number, pageSize: number): void {

    this.isLoading = true;
    this.cdr.detectChanges();

    this.filters['active'] = (this.isActiveStatus() ? '1' : '0');

    this.preferencesService.topicList[this.status].pageIndex = pageIndex;
    this.preferencesService.topicList[this.status].pageSize = pageSize;

    this.topics$ = this.service.getTopics(pageIndex + 1, pageSize, this.buildQuery()).pipe(
      tap(res => {
        this.totalResults = res['total']
      }),
      map(res => res['children'])
    );
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

  newTopic() {
    console.log('new topic');
  }

  editTopic(row: any) {
    console.log('edit topic');
  }

  private isActiveStatus(): boolean {
    return this.status === 'active'
  }

}
