import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReportFormatComponent } from './add-report-format.component';

describe('AddReportFormatComponent', () => {
  let component: AddReportFormatComponent;
  let fixture: ComponentFixture<AddReportFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddReportFormatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReportFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
