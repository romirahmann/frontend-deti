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
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-modal-absensi',
  templateUrl: './modal-absensi.component.html',
  styleUrls: ['./modal-absensi.component.scss'],
})
export class ModalAbsensiComponent implements OnChanges {
  formReport!: FormGroup;
  formEditReport!: FormGroup;

  selectedFile!: File;
  filename!: string;

  @Input() dataReceived: any;
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private apiService: ApiService,
    private route: Router
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if ('dataReceived' in changes && this.dataReceived) {
      if (this.dataReceived.category === 'ADD_REPORT') {
        this.createFormAdd();
      }
      if (this.dataReceived.category === 'EDIT_REPORT') {
        this.createFormEdit();
      }
    }
  }
  executeTestingFunction() {
    const functionToExecute: keyof ModalAbsensiComponent | undefined =
      this.dataReceived?.funct;
    if (
      typeof functionToExecute === 'string' &&
      typeof this[functionToExecute] === 'function'
    ) {
      // Panggil fungsi jika ditemukan
      this[functionToExecute]();
    } else {
      // Penanganan jika nama fungsi tidak valid atau tidak ditemukan
      console.log('Function does not exist or is not a function');
    }
  }
  closeModal() {
    this.closeModalEvent.emit();
  }

  // ADD ABSENSI
  createFormAdd() {
    const data = this.dataReceived;
    this.formReport = this.fb.group({
      user_id: [data.user_id],
      date: ['', Validators.required],
      kehadiran: ['', [Validators.required]],
    });
  }
  submitAdd() {
    this.apiService.addAbsensi(this.formReport.value).subscribe((res: any) => {
      console.log('Absensi Successfully');
      this.closeModal();
    });
  }
  // EDIT ABSENSI
  createFormEdit() {
    const data = this.dataReceived.reports;
    console.log(data);
    this.formEditReport = this.fb.group({
      user_id: [data.user_id],
      date: [data.date],
      kehadiran: [data.kehadiran],
    });
  }
  submitEdit() {
    const data = this.dataReceived.reports;
    const newData = this.formEditReport.value;
    this.apiService
      .updateAbsensi(data.absensi_id, newData)
      .subscribe((res: any) => {
        console.log('Update Successfully');
        this.closeModal();
      });
  }
  // REMOVE
  removeReport() {
    const data = this.dataReceived.reports;
    const newData = {
      is_deleted: 1,
    };
    this.apiService
      .updateAbsensi(data.absensi_id, newData)
      .subscribe((res: any) => {
        console.log('Delete Successfully');
        this.closeModal();
      });
  }
}
