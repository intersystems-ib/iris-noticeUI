import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberListStatusComponent } from './subscriber-list-status.component';

describe('SubscriberListStatusComponent', () => {
  let component: SubscriberListStatusComponent;
  let fixture: ComponentFixture<SubscriberListStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriberListStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriberListStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
