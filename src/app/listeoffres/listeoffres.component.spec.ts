import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeoffresComponent } from './listeoffres.component';

describe('ListeoffresComponent', () => {
  let component: ListeoffresComponent;
  let fixture: ComponentFixture<ListeoffresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeoffresComponent]
    });
    fixture = TestBed.createComponent(ListeoffresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
