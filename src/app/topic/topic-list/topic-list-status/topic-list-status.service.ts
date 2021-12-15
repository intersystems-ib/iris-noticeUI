import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Topic } from '../../topic.model';

import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";

import { environment } from '../../../../environments/environment';
import { QueryResult } from '../../../core/query-result.model';

@Injectable({
  providedIn: 'root'
})
export class TopicListStatusService {

  private urlBaseForms = environment.urlBaseForms
  private noticePackage = environment.noticePackage
  private options = {"headers": {
    "Content-Type": "application/json",
    "Authorization": "Basic ZGdvbnphbGV6OmRnb256YWxlejEyMw=="
  }};

  constructor(
    private http: HttpClient
  ) { }

  getTopics(pageIndex: number, pageSize: number, query: any): Observable<QueryResult<Topic>> {

    let escapedFilter = this.getEscapedFilter(query);

    return this.http.get<QueryResult<Topic>>(
      this.urlBaseForms + `/objects/${this.noticePackage}.Topic/list?size=${pageSize}&page=${pageIndex}&filter=${escapedFilter}&orderby=TopicKey`,
      this.options
    ).pipe(
      catchError(err => {
        console.log('[getTopics] ' + err.message)
        return throwError(err);
      })
    );
  }

  private getEscapedFilter(query: any): string {

    let filter = '';

    if (query.active) {
      filter += `+Active+eq+${query.active}`;
    }

    if (query.topicKey) {
      filter += `+TopicKey+startswith+${query.topicKey}`;
    }

    if (query.contactWay) {
      filter += `+ContactWay+eq+${query.contactWay}`;
    }

    if (query.format) {
      filter += `+Format+eq+${query.format}`;
    }

    if (query.destination) {
      filter += `+Destination+contains+${query.destination}`;
    }

    if (query.botName) {
      filter += `+BotName+eq+${query.botName}`;
    }

    let escapedFilter = filter.replace(new RegExp(' ', 'g'), '%09');
    escapedFilter = escapedFilter.replace(new RegExp('\\+'), '');

    return escapedFilter;
  }
}
