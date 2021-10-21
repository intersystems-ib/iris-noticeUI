import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { TopicRoutingModule } from './topic-routing.module';
import { TopicListComponent } from './topic-list/topic-list.component';
import { TopicListStatusComponent } from './topic-list/topic-list-status/topic-list-status.component';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';


@NgModule({
  declarations: [
    TopicListComponent,
    TopicListStatusComponent,
    TopicDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TopicRoutingModule,
    SharedModule
  ]
})
export class TopicModule { }
