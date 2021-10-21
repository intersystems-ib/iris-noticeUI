import { TestBed } from '@angular/core/testing';

import { SubscriberDetailService } from './subscriber-detail.service';

describe('SubscriberDetailService', () => {
  let service: SubscriberDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriberDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
