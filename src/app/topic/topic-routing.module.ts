import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import { TopicListComponent } from './topic-list/topic-list.component';

const routes: Routes = [
  {
    path: '',
    component: TopicListComponent
  },
  {
    path: ':topicId',
    component: TopicDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicRoutingModule { }
