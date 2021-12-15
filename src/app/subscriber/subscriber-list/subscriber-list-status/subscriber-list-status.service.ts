import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subscriber } from '../../subscriber.model';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from "rxjs/operators";

import { environment } from '../../../../environments/environment';
import { QueryResult } from '../../../core/query-result.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriberListStatusService {

  private urlBaseForms = environment.urlBaseForms
  private noticePackage = environment.noticePackage
  private options = { };

  constructor(
    private http: HttpClient
  ) { }

  getSubscribers(pageIndex: number, pageSize: number, query: any): Observable<QueryResult<Subscriber>> {

    let escapedFilter = this.getEscapedFilter(query);

    return this.http.get<QueryResult<Subscriber>>(
      this.urlBaseForms + `/objects/${this.noticePackage}.Subscriber/list?size=${pageSize}&page=${pageIndex}&filter=${escapedFilter}&orderby=Name`,
      this.options
    ).pipe(
      catchError(err => {
        console.log('[getSubscribers] ' + err.message)
        //this.alertService.error('[getSubscribers] ' + err.message)
        return throwError(err);
      })
    );
  }

  newSubscriber(): Observable<Subscriber> {

    return this.http.post<Subscriber>(this.urlBaseForms + `/object/${this.noticePackage}.Subscriber`,
      {Active: false},
      this.options
    ).pipe(
      map(data => <Subscriber>{_id: data['Id']})
    );
  }

  private getEscapedFilter(query: any): string {

    let filter = '';

    if (query.active) {
      filter += `+Active+eq+${query.active}`;
    }

    if (query.employeeId) {
      filter += `+EmployeeId+eq+${query.employeeId}`;
    }

    if (query.name) {
      filter += `+Name+eq+${query.name}`;
    }

    if (query.surname) {
      filter += `+SurName+eq+${query.surname}`;
    }

    if (query.email) {
      filter += `+Email+eq+${query.email}`;
    }

    let escapedFilter = filter.replace(new RegExp(' ', 'g'), '%09');
    escapedFilter = escapedFilter.replace(new RegExp('\\+'), '');

    return escapedFilter;
  }
}
