import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCoursFormateurComponent } from './list-cours-formateur.component';

describe('ListCoursFormateurComponent', () => {
  let component: ListCoursFormateurComponent;
  let fixture: ComponentFixture<ListCoursFormateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCoursFormateurComponent]
    });
    fixture = TestBed.createComponent(ListCoursFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
