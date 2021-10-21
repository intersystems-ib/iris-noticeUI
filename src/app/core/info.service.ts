import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor() { }

  getAppInfo(): any {
    return {
      name: 'noticeUI',
      version: '1.0',
      srcVersion: '@srcVersion',
      srcTooltip: '@srcTooltip'
    };
  }
}
