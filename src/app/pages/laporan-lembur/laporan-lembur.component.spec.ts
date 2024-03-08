import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaporanLemburComponent } from './laporan-lembur.component';

describe('LaporanLemburComponent', () => {
  let component: LaporanLemburComponent;
  let fixture: ComponentFixture<LaporanLemburComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaporanLemburComponent]
    });
    fixture = TestBed.createComponent(LaporanLemburComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
