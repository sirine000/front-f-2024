import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursparticipantComponent } from './coursparticipant.component';

describe('CoursparticipantComponent', () => {
  let component: CoursparticipantComponent;
  let fixture: ComponentFixture<CoursparticipantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursparticipantComponent]
    });
    fixture = TestBed.createComponent(CoursparticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
