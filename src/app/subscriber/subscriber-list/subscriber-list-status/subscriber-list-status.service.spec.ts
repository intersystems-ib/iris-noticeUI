import { TestBed } from '@angular/core/testing';

import { SubscriberListStatusService } from './subscriber-list-status.service';

describe('SubscriberListStatusService', () => {
  let service: SubscriberListStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriberListStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
