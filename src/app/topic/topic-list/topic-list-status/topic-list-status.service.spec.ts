import { TestBed } from '@angular/core/testing';

import { TopicListStatusService } from './topic-list-status.service';

describe('TopicListStatusService', () => {
  let service: TopicListStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopicListStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
