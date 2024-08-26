import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccparticipantComponent } from './accparticipant.component';

describe('AccparticipantComponent', () => {
  let component: AccparticipantComponent;
  let fixture: ComponentFixture<AccparticipantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccparticipantComponent]
    });
    fixture = TestBed.createComponent(AccparticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
