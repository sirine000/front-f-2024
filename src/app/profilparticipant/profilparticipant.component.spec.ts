import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilparticipantComponent } from './profilparticipant.component';

describe('ProfilparticipantComponent', () => {
  let component: ProfilparticipantComponent;
  let fixture: ComponentFixture<ProfilparticipantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilparticipantComponent]
    });
    fixture = TestBed.createComponent(ProfilparticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
