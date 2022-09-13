import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-bypass-security',
  templateUrl: './bypass-security.component.html',
})
export class BypassSecurityComponent {
  urlDashboard!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.urlDashboard = this.sanitizer.bypassSecurityTrustResourceUrl(environment.urlDashboard);
  }
}