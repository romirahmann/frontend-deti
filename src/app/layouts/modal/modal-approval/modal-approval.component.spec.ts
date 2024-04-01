import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalApprovalComponent } from './modal-approval.component';

describe('ModalApprovalComponent', () => {
  let component: ModalApprovalComponent;
  let fixture: ComponentFixture<ModalApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalApprovalComponent]
    });
    fixture = TestBed.createComponent(ModalApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
