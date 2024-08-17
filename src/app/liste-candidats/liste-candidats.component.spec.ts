import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCandidatsComponent } from './liste-candidats.component';

describe('ListeCandidatsComponent', () => {
  let component: ListeCandidatsComponent;
  let fixture: ComponentFixture<ListeCandidatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeCandidatsComponent]
    });
    fixture = TestBed.createComponent(ListeCandidatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
