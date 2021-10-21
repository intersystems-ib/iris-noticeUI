import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'subscriber',
    pathMatch: 'full'
  },
  {
    path: 'subscriber',
    loadChildren: () => import('./subscriber/subscriber.module').then(m => m.SubscriberModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'topic',
    loadChildren: () => import('./topic/topic.module').then(m => m.TopicModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
