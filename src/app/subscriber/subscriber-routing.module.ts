import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriberDetailComponent } from './subscriber-detail/subscriber-detail.component';
import { SubscriberListComponent } from './subscriber-list/subscriber-list.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: SubscriberListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':subscriberId',
    component: SubscriberDetailComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriberRoutingModule { }
