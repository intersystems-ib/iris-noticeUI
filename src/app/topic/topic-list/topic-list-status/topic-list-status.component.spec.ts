import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicListStatusComponent } from './topic-list-status.component';

describe('TopicListStatusComponent', () => {
  let component: TopicListStatusComponent;
  let fixture: ComponentFixture<TopicListStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicListStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicListStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
