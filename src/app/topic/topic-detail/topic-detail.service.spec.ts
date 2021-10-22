import { TestBed } from '@angular/core/testing';

import { TopicDetailService } from './topic-detail.service';

describe('TopicDetailService', () => {
  let service: TopicDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopicDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
