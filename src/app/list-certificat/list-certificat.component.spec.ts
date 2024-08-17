import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCertificatComponent } from './list-certificat.component';

describe('ListCertificatComponent', () => {
  let component: ListCertificatComponent;
  let fixture: ComponentFixture<ListCertificatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCertificatComponent]
    });
    fixture = TestBed.createComponent(ListCertificatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
