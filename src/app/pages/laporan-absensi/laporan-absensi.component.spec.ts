import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaporanAbsensiComponent } from './laporan-absensi.component';

describe('LaporanAbsensiComponent', () => {
  let component: LaporanAbsensiComponent;
  let fixture: ComponentFixture<LaporanAbsensiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaporanAbsensiComponent]
    });
    fixture = TestBed.createComponent(LaporanAbsensiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
