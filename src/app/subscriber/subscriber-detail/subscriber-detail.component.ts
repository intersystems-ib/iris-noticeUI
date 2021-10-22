import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../../core/confirm-dialog/confirm-dialog.component';
import { ContactWay, IdentificationNumber, Language, Notification, Subscriber, Subscription } from '../subscriber.model';
import { EditComponent } from './edit/edit.component';
import { SubscriberDetailService } from './subscriber-detail.service';

@Component({
  selector: 'app-subscriber-detail',
  templateUrl: './subscriber-detail.component.html',
  styleUrls: ['./subscriber-detail.component.scss']
})
export class SubscriberDetailComponent implements OnInit {

  subscriberId: number;

  subscriber$: Observable<Subscriber>;
  identificationNumbers$: Observable<IdentificationNumber[]>;
  contactWays$: Observable<ContactWay[]>;
  subscriptions$: Observable<Subscription[]>;
  lastNotifications$: Observable<Notification[]>;
  languages$: Language[];
  topicKeys$: string[] = [];

  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  subscriber: Subscriber;

  inDisplayedColumns = ['actions', 'type', 'code'];
  cwDisplayedColumns = ['actions', 'type', 'address'];
  sDisplayedColumns = ['actions', 'topic'];
  lnDisplayedColumns = ['text'];

  @ViewChild('subscriberDetailsForm') subscriberDetailsForm: NgForm;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog,
    public service: SubscriberDetailService
  ) { }

  ngOnInit(): void {

    this.loadLanguages();
    this.loadTopics();
    this.loadData();
  }

  loadLanguages() {

    this.service.getLanguages().pipe(
      map(res => res['children'])
    ).subscribe(
      languages => {
        this.languages$ = languages;
      }
    );
  }

  loadTopics() {

    this.service.getTopicKeys().pipe(
      map(res => res['children'])
    ).subscribe(
      topicKeys => {
        for (let i = 0; i < topicKeys.length; i++) {
          let topicKey = topicKeys[i];
          this.topicKeys$[i] = topicKey.TopicKey;
        }
      }
    )
  }

  loadData() {

    this.setSubscriberId();

    this.loading$.next(true);

    this.subscriber$ = this.service.getSubscriberById(this.subscriberId).pipe(
      tap(subscriber => {
        this.subscriber = subscriber;
        this.subscriber._id = this.subscriberId;
      })
    );

    this.identificationNumbers$ = this.service.getIdentificationNumbersBySubscriberId(this.subscriberId).pipe(
      map(res => res['children'])
    );

    this.contactWays$ = this.service.getContactWaysBySubscriberId(this.subscriberId).pipe(
      map(res => res['children'])
    );

    this.subscriptions$ = this.service.getSubscriptionsBySubscriberId(this.subscriberId).pipe(
      map(res => res['children'])
    );

    this.lastNotifications$ = this.service.getLastNotificationsBySubscriberId(this.subscriberId).pipe(
      map(res => res['children'])
    );
    
    this.loading$.next(false);
  }

  private setSubscriberId(): void {

    if (!this.subscriberId && this.route.snapshot.paramMap != null) {

      let paramSubscriberId = this.route.snapshot.paramMap.get("subscriberId");
      if (paramSubscriberId != null) {
        this.subscriberId = +paramSubscriberId;
      }
    }
  }

  save(): void {

    this.service.saveSubscriber(this.subscriber).subscribe(
      () => {
        this.afterSave()
      }
    )
  }

  afterSave(): void {

    // reset forms to restore dirty/pristine status
    this.subscriberDetailsForm.reset();

    // get data from server
    this.loadData();

    // notify user
    //this.openMessageBar('Subscriber saved', 'Saved');
  }

  clickAddIdentificationNumber() {

    const dialogRef = this.dialog.open(EditComponent, {
      width: '250px',
      data: {
        title: 'Create Identification Number',
        subscriber: this.subscriberId,
        typeLabel: 'Type',
        type: '',
        valueLabel: 'Code',
        value: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.createIdentificationNumber(result).subscribe(
          () => {
            this.loadData()
          }
        )
      }
    });
  }

  clickEditIdentificationNumber(identificationNumber: IdentificationNumber) {

    const dialogRef = this.dialog.open(EditComponent, {
      width: '250px',
      data: {
        title: 'Update Identification Number', 
        typeLabel: 'Type',
        type: identificationNumber.Type,
        valueLabel: 'Code',
        value: identificationNumber.Code
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        identificationNumber.Type = result.type;
        identificationNumber.Code = result.value;

        this.service.updateIdentificationNumber(identificationNumber).subscribe(
          () => {
            //this.loadData()
          }
        )
      }
    });
  }

  clickDeleteIdentificationNumber(identificationNumber: IdentificationNumber) {
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmation',
        text: `Delete Identification Number ${identificationNumber.Type} ${identificationNumber.Code}?`
      }
    });

    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.service.deleteIdentificationNumber(identificationNumber._id).subscribe(
          () => {
              this.loadData();
          }
        )
      }
    });
  }

  clickAddContactWay() {

    const dialogRef = this.dialog.open(EditComponent, {
      width: '250px',
      data: {
        title: 'Create Contact Way',
        subscriber: this.subscriberId,
        typeLabel: 'Type',
        type: '',
        valueLabel: 'Address',
        value: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.createContactWay(result).subscribe(
          () => {
            this.loadData()
          }
        )
      }
    });
  }

  clickEditContactWay(contactWay: ContactWay) {

    const dialogRef = this.dialog.open(EditComponent, {
      width: '250px',
      data: {
        title: 'Update Contact Way',
        typeLabel: 'Type',
        type: contactWay.Type,
        valueLabel: 'Address',
        value: contactWay.Address
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        contactWay.Type = result.type;
        contactWay.Address = result.value;

        this.service.updateContactWay(contactWay).subscribe(
          () => {
            //this.loadData()
          }
        )
      }
    });
  }

  clickDeleteContactWay(contactWay: ContactWay) {
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmation',
        text: `Delete Contact Way ${contactWay.Type} ${contactWay.Address}?`
      }
    });

    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.service.deleteContactWay(contactWay._id).subscribe(
          () => {
              this.loadData();
          }
        )
      }
    });
  }

  clickAddSubscription() {

    const dialogRef = this.dialog.open(EditComponent, {
      width: '300px',
      data: {
        title: 'Create Subscription',
        subscriber: this.subscriberId,
        isTypeAutocomplete: true,
        typeLabel: 'Topic',
        type: '',
        typeOptions: this.topicKeys$
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.createSubscription(result).subscribe(
          () => {
            this.loadData()
          }
        )
      }
    });
  }

  clickEditSubscription(subscription: Subscription) {

    const dialogRef = this.dialog.open(EditComponent, {
      width: '300px',
      data: {
        title: 'Update Subscription',
        isTypeAutocomplete: true,
        typeLabel: 'Topic',
        type: subscription.Topic,
        typeOptions: this.topicKeys$
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        subscription.Topic = result.type;

        this.service.updateSubscription(subscription).subscribe(
          () => {
            //this.loadData()
          }
        )
      }
      console.log('result', result);
    });
  }

  clickDeleteSubscription(subscription: Subscription) {
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmation',
        text: `Delete Subscription to Topic ${subscription.Topic}?`
      }
    });

    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.service.deleteSubscription(subscription._id).subscribe(
          () => {
              this.loadData();
          }
        )
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

}
