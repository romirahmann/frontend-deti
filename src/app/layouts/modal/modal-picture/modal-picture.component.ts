import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-modal-picture',
  templateUrl: './modal-picture.component.html',
  styleUrls: ['./modal-picture.component.scss'],
})
export class ModalPictureComponent implements OnChanges {
  selectedFile!: File;
  filename!: string;
  @Input() dataReceived: any;
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if ('dataReceived' in changes && this.dataReceived) {
      if (this.dataReceived.category === 'ADD_FOTO') {
        console.log(this.dataReceived.dataFoto);
      }
    }
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  // File
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  uploadImage() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.apiService.uploadFile(formData).subscribe(
      (res: any) => {
        this.filename = res.filename;
        // console.log(this.filename);
        this.updateUser();
      },
      (err: any) => {
        console.log(err, 'Failure Upload Image');
      }
    );
  }

  updateUser() {
    const id = this.dataReceived.dataFoto.user_id;
    const data = {
      foto_profil: this.filename,
    };
    this.apiService.updateUser(id, data).subscribe((res: any) => {
      console.log('Upload Image Successfully');
      this.updateUserLogin();
      this.closeModal();
    });
  }

  updateUserLogin() {
    let data = this.dataReceived.dataFoto;
    data.foto_profil = this.filename;
    this.authService.updateUserLogin(data);
  }

  removeFoto() {
    let data = this.dataReceived.dataFoto;
    data.foto_profil = null;
    this.authService.updateUserLogin(data);
    this.closeModal();
  }

  executeTestingFunction() {
    const functionToExecute: keyof ModalPictureComponent | undefined =
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
}
