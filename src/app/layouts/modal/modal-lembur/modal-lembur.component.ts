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
  selector: 'app-modal-lembur',
  templateUrl: './modal-lembur.component.html',
  styleUrls: ['./modal-lembur.component.scss'],
})
export class ModalLemburComponent implements OnChanges {
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
        console.log(this.dataReceived);
        this.createFormAddReport();
      }
      if (this.dataReceived.category === 'EDIT_REPORT') {
        console.log(this.dataReceived);
      }
      if (this.dataReceived.category === 'REMOVE_MODAL') {
        console.log(this.dataReceived);
      }
    }
  }
  executeTestingFunction() {
    const functionToExecute: keyof ModalLemburComponent | undefined =
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

  // File
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  uploadImage() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.apiService.uploadFile(formData).subscribe(
      (res: any) => {
        this.filename = res.filename;
        console.log(this.filename);
        // Set the filename in the form after successful upload
        this.formReport.patchValue({ file_bukti: this.filename });
        this.addReport();
      },
      (err: any) => {
        console.log(err, 'Failure Upload Image');
      }
    );
  }

  // FORM ADD
  createFormAddReport() {
    this.formReport = this.fb.group({
      client_name: ['', Validators.required],
      duration: [null, Validators.required], // Change the initial value to null or appropriate default
      user_id: [this.dataReceived.user_id, Validators.required],
      date: ['', Validators.required],
      file_bukti: [''], // Rename to file instead of filename
    });
  }

  addReport() {
    if (this.formReport.valid) {
      this.apiService.addReport(this.formReport.value).subscribe((res: any) => {
        console.log(res);
        this.closeModal();
      });
    } else {
      alert('Harap isi form dengan benar');
    }
  }
}
