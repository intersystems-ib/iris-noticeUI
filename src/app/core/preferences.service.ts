import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  /** subscriber-list preferences */
  subscriberList = {
    active: {
      filters: {},
      pageIndex: 0,
      pageSize: 50
    },
    inactive: {
      filters: {},
      pageIndex: 0,
      pageSize: 50
    }
  };

  /** topic-list preferences */
  topicList = {
    active: {
      filters: {},
      pageIndex: 0,
      pageSize: 50
    },
    inactive: {
      filters: {},
      pageIndex: 0,
      pageSize: 50
    }
  };

  constructor() { }
}
