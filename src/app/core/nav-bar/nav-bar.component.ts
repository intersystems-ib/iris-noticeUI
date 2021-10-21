import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  envDescription: string = environment.description;
  envTooltip: string = environment.tooltip;
  envToolbarClass: string = 'mat-toolbar-' + environment.name;
  isLoggedIn$: Observable<boolean>;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  ngOnInit(): void {
  }

  clickSubscribers(): void {
    this.router.navigate(['/subscriber']);
  }

  clickTopics(): void {
    this.router.navigate(['/topic']);
  }

  clickNotifications(): void {
    console.log('Notifications');
  }

  clickMasterFiles(): void {
    console.log('Master Files');
  }

  clickLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  clickLogout(): void {
    this.router.navigate(['/auth/logout']);
  }
}
