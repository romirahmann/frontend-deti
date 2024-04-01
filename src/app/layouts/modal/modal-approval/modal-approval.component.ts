import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-modal-approval',
  templateUrl: './modal-approval.component.html',
  styleUrls: ['./modal-approval.component.scss'],
})
export class ModalApprovalComponent {
  @Input() dataReceived: any;
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(private route: Router, private apiService: ApiService) {}
  closeModal() {
    this.closeModalEvent.emit();
  }
  // APPROVAL
  approval(x: number) {
    if (x === 1) {
      const report = this.dataReceived.reports;
      const data = {
        approval_id: 1,
      };
      this.apiService
        .updateReport(report.lembur_id, data)
        .subscribe((res: any) => {
          console.log('Delete Successfully');
          this.closeModal();
        });
    }
    if (x === 0) {
      const report = this.dataReceived.reports;
      const data = {
        approval_id: 2,
      };
      this.apiService
        .updateReport(report.lembur_id, data)
        .subscribe((res: any) => {
          console.log('Delete Successfully');
          this.closeModal();
        });
    }
  }
}
