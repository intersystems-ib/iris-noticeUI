import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { AlertDisplayComponent } from './alert-display/alert-display.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    AlertDisplayComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    NavBarComponent,
    FooterComponent,
    AlertDisplayComponent,
    ConfirmDialogComponent
  ]
})
export class CoreModule { }
