import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteparticipantComponent } from './compteparticipant.component';

describe('CompteparticipantComponent', () => {
  let component: CompteparticipantComponent;
  let fixture: ComponentFixture<CompteparticipantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompteparticipantComponent]
    });
    fixture = TestBed.createComponent(CompteparticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
