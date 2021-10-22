import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { environment } from '../../../environments/environment';
import { AlertService } from '../../core/alert.service';
import { QueryResult } from '../../core/query-result.model';
import { Topic } from '../../topic/topic.model';
import { ContactWay, IdentificationNumber, Language, Notification, Subscriber, Subscription } from '../subscriber.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriberDetailService {

  private urlBaseForms = environment.urlBaseForms
  private options = { };

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) { }

  getSubscriberById(id: number): Observable<Subscriber> {

    return this.http.get<Subscriber>(
      this.urlBaseForms + `/object/Notice.DAT.Subscriber/${id}`,
      this.options
    ).pipe(
      catchError(err => {
        this.alertService.error('[getSubscriberById] ' + err.message)
        return throwError(err);
      })
    );
  }

  saveSubscriber(subscriber: Subscriber): Observable<Subscriber> {

    let data = {
      Name: subscriber.Name,
      SurName: subscriber.SurName,
      Active: subscriber.Active,
      Lang: subscriber.Lang
    };
    return this.http.put<Subscriber>(
      this.urlBaseForms + `/object/Notice.DAT.Subscriber/${subscriber._id}`,
      data,
      this.options
    ).pipe(
      catchError(err => {
        this.alertService.error('[saveSubscriber] ' + err.message)
        return throwError(err);
      })
    );
  }

  getLanguages(): Observable<QueryResult<Language>> {

    return this.http.get<QueryResult<Language>>(
      this.urlBaseForms + `/objects/Notice.DAT.Lang/list?orderby=Description`,
      this.options
    ).pipe(
      catchError(err => {
        this.alertService.error('[getLanguages] ' + err.message)
        return throwError(err);
      })
    );
  }

  getTopicKeys(): Observable<QueryResult<Topic>> {

    let escapedFilter = `Active+eq+1`;

    return this.http.get<QueryResult<Topic>>(
      this.urlBaseForms + `/objects/Notice.DAT.Topic/listTopicKeys?filter=${escapedFilter}&orderby=TopicKey`,
      this.options
    ).pipe(
      catchError(err => {
        this.alertService.error('[getTopics] ' + err.message)
        return throwError(err);
      })
    );
  }

  getIdentificationNumbersBySubscriberId(subscriberId: number): Observable<QueryResult<IdentificationNumber>> {

    let escapedFilter = `Subscriber+eq+${subscriberId}`;

    return this.http.get<QueryResult<IdentificationNumber>>(
      this.urlBaseForms + `/objects/Notice.DAT.UserID/list?size=50&page=1&filter=${escapedFilter}&orderby=2`,
      this.options
    ).pipe(
      catchError(err => {
        this.alertService.error('[getIdentificationNumbersBySubscriberId] ' + err.message)
        return throwError(err);
      })
    );
  }

  createIdentificationNumber(identificationNumber: any): Observable<IdentificationNumber> {

    let data = {
      Subscriber: identificationNumber.subscriber,
      Type: identificationNumber.type,
      Code: identificationNumber.value
    };

    return this.http.post<IdentificationNumber>(
      this.urlBaseForms + `/object/Notice.DAT.UserID`,
      data,
      this.options
    ).pipe(
      catchError(err => {
        this.alertService.error('[createIdentificationNumber] ' + err.message)
        return throwError(err);
      })
    );
  }

  updateIdentificationNumber(identificationNumber: IdentificationNumber): Observable<IdentificationNumber> {

    let data = {
      Type: identificationNumber.Type,
      Code: identificationNumber.Code
    };

    return this.http.put<IdentificationNumber>(
      this.urlBaseForms + `/object/Notice.DAT.UserID/${identificationNumber._id}`,
      data,
      this.options
    ).pipe(
      catchError(err => {
        this.alertService.error('[updateIdentificationNumber] ' + err.message)
        return throwError(err);
      })
    );
  }

  deleteIdentificationNumber(id: number): Observable<IdentificationNumber> {

    return this.http.delete<IdentificationNumber>(
      this.urlBaseForms + `/object/Notice.DAT.UserID/${id}`,
      this.options
    ).pipe(
      map(() => <IdentificationNumber>{}),
      catchError(err => {
        this.alertService.error('[deleteIdentificationNumber] ' + err.message)
        return throwError(err);
      })
    );
  }

  getContactWaysBySubscriberId(subscriberId: number): Observable<QueryResult<ContactWay>> {

    let escapedFilter = `Subscriber+eq+${subscriberId}`;

    return this.http.get<QueryResult<ContactWay>>(
      this.urlBaseForms + `/objects/Notice.DAT.ContactWay/list?size=50&page=1&filter=${escapedFilter}&orderby=2`,
      this.options
    ).pipe(
      catchError(err => {
        this.alertService.error('[getContactWaysBySubscriberId] ' + err.message)
        return throwError(err);
      })
    );
  }

  createContactWay(contactWay: any): Observable<ContactWay> {

    let data = {
      Subscriber: contactWay.subscriber,
      Type: contactWay.type,
      Address: contactWay.value
    };

    return this.http.post<ContactWay>(
      this.urlBaseForms + `/object/Notice.DAT.ContactWay`,
      data,
      this.options
    ).pipe(
      catchError(err => {
        this.alertService.error('[createContactWay] ' + err.message)
        return throwError(err);
      })
    );
  }

  updateContactWay(contactWay: ContactWay): Observable<ContactWay> {

    let data = {
      Type: contactWay.Type,
      Address: contactWay.Address
    };

    return this.http.put<ContactWay>(
      this.urlBaseForms + `/object/Notice.DAT.ContactWay/${contactWay._id}`,
      data,
      this.options
    ).pipe(
      catchError(err => {
        this.alertService.error('[updateContactWay] ' + err.message)
        return throwError(err);
      })
    );
  }

  deleteContactWay(id: number): Observable<ContactWay> {

    return this.http.delete<ContactWay>(
      this.urlBaseForms + `/object/Notice.DAT.ContactWay/${id}`,
      this.options
    ).pipe(
      map(() => <ContactWay>{}),
      catchError(err => {
        this.alertService.error('[deleteContactWay] ' + err.message)
        return throwError(err);
      })
    );
  }

  getSubscriptionsBySubscriberId(subscriberId: number): Observable<QueryResult<Subscription>> {

    let escapedFilter = `Subscriber+eq+${subscriberId}`;

    return this.http.get<QueryResult<Subscription>>(
      this.urlBaseForms + `/objects/Notice.DAT.Subscription/list?size=50&page=1&filter=${escapedFilter}&orderby=2`,
      this.options
    ).pipe(
      catchError(err => {
        this.alertService.error('[getSubscriptionsBySubscriberId] ' + err.message)
        return throwError(err);
      })
    );
  }

  createSubscription(subscription: any): Observable<Subscription> {

    let data = {
      Subscriber: subscription.subscriber,
      Topic: subscription.type
    };

    return this.http.post<Subscription>(
      this.urlBaseForms + `/object/Notice.DAT.Subscription`,
      data,
      this.options
    ).pipe(
      catchError(err => {
        this.alertService.error('[createSubscription] ' + err.message)
        return throwError(err);
      })
    );
  }

  updateSubscription(subscription: Subscription): Observable<Subscription> {

    let data = {
      Topic: subscription.Topic
    };

    return this.http.put<Subscription>(
      this.urlBaseForms + `/object/Notice.DAT.Subscription/${subscription._id}`,
      data,
      this.options
    ).pipe(
      catchError(err => {
        this.alertService.error('[updateSubscription] ' + err.message)
        return throwError(err);
      })
    );
  }

  deleteSubscription(id: number): Observable<Subscription> {

    return this.http.delete<Subscription>(
      this.urlBaseForms + `/object/Notice.DAT.Subscription/${id}`,
      this.options
    ).pipe(
      map(() => <Subscription>{}),
      catchError(err => {
        this.alertService.error('[deleteSubscription] ' + err.message)
        return throwError(err);
      })
    );
  }

  getLastNotificationsBySubscriberId(subscriberId: number): Observable<QueryResult<Notification>> {

    let escapedFilter = `Subscriber+eq+${subscriberId}+Result+eq+OK`;

    return this.http.get<QueryResult<Notification>>(
      this.urlBaseForms + `/objects/Notice.DAT.Notification/list?size=5&page=1&filter=${escapedFilter}&orderby=2+desc`,
      this.options
    ).pipe(
      catchError(err => {
        this.alertService.error('[getNotificationsBySubscriberId] ' + err.message)
        return throwError(err);
      })
    );
  }
}
