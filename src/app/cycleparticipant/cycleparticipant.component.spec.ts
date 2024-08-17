import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleparticipantComponent } from './cycleparticipant.component';

describe('CycleparticipantComponent', () => {
  let component: CycleparticipantComponent;
  let fixture: ComponentFixture<CycleparticipantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CycleparticipantComponent]
    });
    fixture = TestBed.createComponent(CycleparticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
