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
      }
      if (this.dataReceived.category === 'EDIT_REPORT') {
      }
      if (this.dataReceived.category === 'REMOVE_MODAL') {
        console.log(this.dataReceived);
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
  submitAdd() {
    console.log('ADD');
  }
  // EDIT ABSENSI
  submitEdit() {
    console.log('edit');
  }
  // REMOVE
}
