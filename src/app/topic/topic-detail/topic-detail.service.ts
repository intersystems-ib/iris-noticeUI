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
  private noticePackage = environment.noticePackage
  private options = { };

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) { }

  getTopicById(id: number): Observable<Topic> {

    return this.http.get<Topic>(
      this.urlBaseForms + `/object/${this.noticePackage}.Topic/${id}`,
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
      Template: topic.Template,
      TemplateMsg: topic.TemplateMsg,
      BotName: topic.BotName,
      ContactWay: topic.ContactWay,
      Format: topic.Format,
      Destination: topic.Destination,
      Active: topic.Active,
      Subject: topic.Subject,
      SubjectMsg: topic.SubjectMsg,
      OutboundAdapter: topic.OutboundAdapter,
      BodyFormat: topic.BodyFormat,
      BodyTemplate: topic.BodyTemplate,
      ExecutionComponent: topic.ExecutionComponent,
      ValidationCommand: topic.ValidationCommand
    };
    return this.http.put<Topic>(
      this.urlBaseForms + `/object/${this.noticePackage}.Topic/${topic._id}`,
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
