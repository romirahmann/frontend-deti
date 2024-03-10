import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAbsensiComponent } from './modal-absensi.component';

describe('ModalAbsensiComponent', () => {
  let component: ModalAbsensiComponent;
  let fixture: ComponentFixture<ModalAbsensiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAbsensiComponent]
    });
    fixture = TestBed.createComponent(ModalAbsensiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
