import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientListManagmentComponent } from './patient-list-managment.component';

describe('PatientListManagmentComponent', () => {
  let component: PatientListManagmentComponent;
  let fixture: ComponentFixture<PatientListManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientListManagmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientListManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
