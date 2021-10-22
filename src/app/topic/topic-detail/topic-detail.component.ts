import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Topic } from '../topic.model';
import { TopicDetailService } from './topic-detail.service';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.scss']
})
export class TopicDetailComponent implements OnInit {

  topicId: number;

  topic$: Observable<Topic>;

  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  topic: Topic;

  @ViewChild('topicDetailsForm') topicDetailsForm: NgForm;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog,
    public service: TopicDetailService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {

    this.setTopicId();

    this.loading$.next(true);

    this.topic$ = this.service.getTopicById(this.topicId).pipe(
      tap(topic => {
        this.topic = topic;
        this.topic._id = this.topicId;
      })
    );

    this.loading$.next(false);
  }

  private setTopicId(): void {

    if (!this.topicId && this.route.snapshot.paramMap != null) {

      let paramTopicId = this.route.snapshot.paramMap.get("topicId");
      if (paramTopicId != null) {
        this.topicId = +paramTopicId;
      }
    }
  }

  save(): void {

    this.service.saveTopic(this.topic).subscribe(
      () => {
        this.afterSave()
      }
    )
  }

  afterSave(): void {

    // reset forms to restore dirty/pristine status
    this.topicDetailsForm.reset();

    // get data from server
    this.loadData();

    // notify user
    //this.openMessageBar('Topic saved', 'Saved');
  }

  goBack(): void {
    this.location.back();
  }

}
