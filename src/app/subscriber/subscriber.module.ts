import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { SubscriberRoutingModule } from './subscriber-routing.module';
import { SubscriberListComponent } from './subscriber-list/subscriber-list.component';
import { SubscriberDetailComponent } from './subscriber-detail/subscriber-detail.component';
import { SubscriberListStatusComponent } from './subscriber-list/subscriber-list-status/subscriber-list-status.component';
import { EditComponent } from './subscriber-detail/edit/edit.component';


@NgModule({
  declarations: [
    SubscriberListComponent,
    SubscriberDetailComponent,
    SubscriberListStatusComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SubscriberRoutingModule,
    SharedModule
  ]
})
export class SubscriberModule { }
