import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLemburComponent } from './modal-lembur.component';

describe('ModalLemburComponent', () => {
  let component: ModalLemburComponent;
  let fixture: ComponentFixture<ModalLemburComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalLemburComponent]
    });
    fixture = TestBed.createComponent(ModalLemburComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
