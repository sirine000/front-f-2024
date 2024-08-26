import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilformateurComponent } from './accueilformateur.component';

describe('AccueilformateurComponent', () => {
  let component: AccueilformateurComponent;
  let fixture: ComponentFixture<AccueilformateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccueilformateurComponent]
    });
    fixture = TestBed.createComponent(AccueilformateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
