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

  getValidationCommandTooltipText(): string {
    return `Object script command that can use an IBSP.Notice.Messages.NoticeReq object named 'req'. It must set a boolean value in the variable 'res'.
    It also has a status code in the variable 'sc', which is initialized to 1 (OK) by default.
    Additionally, it can return a message in the variable 'msg'.
    This command will be executed inside a try/catch, so, if it throws an exception, it will be caught and set in the variable 'sc' as a status.
    It can also call a ClassMethod. This method must return a status code and, at least, must receive the variable 'res' as a parameter by reference.
    
    EXAMPLES:
    - Direct command to execute:
    set res = req.UserIdCode = "123456" set msg = "Message to return" set sc = 1
    
    - Calling a class with the full req object as a parameter:
    set sc = ##class(Package.ClassName).FunctionName(req, .res, .msg)
    
    - Calling a class with req object properties as parameters
    set sc = ##class(Package.ClassName).FunctionName(req.UserIdType, req.UserIdCode, .res, .msg)`;
  }

}
