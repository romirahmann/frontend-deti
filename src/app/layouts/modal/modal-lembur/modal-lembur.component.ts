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
        this.createFormAddReport();
      }
      if (this.dataReceived.category === 'EDIT_REPORT') {
        this.createFormEditReport();
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

  // FORM EDIT
  createFormEditReport() {
    const report = this.dataReceived.reports;
    console.log(report);
    this.formEditReport = this.fb.group({
      client_name: [report.client_name],
      duration: [report.duration], // Change the initial value to null or appropriate default
      user_id: [report.user_id],
      date: [report.date],
      file_bukti: [''], // Rename to file instead of filename
    });
  }
  submitEdit() {
    if (this.selectedFile) {
      const report = this.dataReceived.reports;
      this.apiService.deleteFile(report.file_bukti).subscribe(
        (res: any) => {
          const formData = new FormData();
          formData.append('file', this.selectedFile);

          this.apiService.uploadFile(formData).subscribe(
            (res: any) => {
              this.filename = res.filename;
              console.log(this.filename);
              // Set the filename in the form after successful upload
              this.formEditReport.patchValue({ file_bukti: this.filename });
              this.apiService
                .updateReport(report.lembur_id, this.formEditReport.value)
                .subscribe((res: any) => {
                  console.log('All Update Successfully');
                  this.closeModal();
                });
            },
            (err: any) => {
              console.log(err, 'Failure Upload Image');
            }
          );
        },
        (err: any) => {
          console.log('ERROR DELETE FILE', err);
        }
      );
    } else {
      const report = this.dataReceived.reports;
      this.apiService
        .updateReport(report.lembur_id, this.formEditReport.value)
        .subscribe((res: any) => {
          console.log('Update Report Successfully');
        });
    }
  }

  // REMOVE
  removeReport() {
    const report = this.dataReceived.reports;
    const data = {
      is_deleted: 1,
    };
    this.apiService
      .updateReport(report.lembur_id, data)
      .subscribe((res: any) => {
        console.log('Delete Successfully');
        this.closeModal();
      });
  }
}
