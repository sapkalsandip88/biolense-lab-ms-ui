import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrameterWithNormalRangeComponent } from './prameter-with-normal-range.component';

describe('PrameterWithNormalRangeComponent', () => {
  let component: PrameterWithNormalRangeComponent;
  let fixture: ComponentFixture<PrameterWithNormalRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrameterWithNormalRangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrameterWithNormalRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
