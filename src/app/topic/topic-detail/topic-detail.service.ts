import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { environment } from '../../../environments/environment';
import { AlertService } from '../../core/alert.service';
import { Topic } from '../../topic/topic.model';

@Injectable({
  providedIn: 'root'
})
export class TopicDetailService {

  private urlBaseForms = environment.urlBaseForms
  private options = { };

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) { }

  getTopicById(id: number): Observable<Topic> {

    return this.http.get<Topic>(
      this.urlBaseForms + `/object/Notice.DAT.Topic/${id}`,
      this.options
    ).pipe(
      catchError(err => {
        this.alertService.error('[getTopicById] ' + err.message)
        return throwError(err);
      })
    );
  }

  saveTopic(topic: Topic): Observable<Topic> {

    let data = {
      TopicKey: topic.TopicKey,
      ContactWay: topic.ContactWay,
      Format: topic.Format,
      Destination: topic.Destination,
      BotName: topic.BotName,
      Template: topic.Template,
      Active: topic.Active
    };
    return this.http.put<Topic>(
      this.urlBaseForms + `/object/Notice.DAT.Topic/${topic._id}`,
      data,
      this.options
    ).pipe(
      catchError(err => {
        this.alertService.error('[saveTopic] ' + err.message)
        return throwError(err);
      })
    );
  }
}
