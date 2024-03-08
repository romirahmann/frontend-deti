import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  formRegister!: FormGroup;
  hideToglePassword: boolean = true;
  rolesData!: any;

  constructor(
    private fb: FormBuilder,
    private authApi: AuthService,
    private api: ApiService,
    private route: Router
  ) {}
  ngOnInit() {
    this.getFormLogin();
    this.getAllRole();
  }
  getFormLogin() {
    this.formRegister = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role_id: [null, Validators.required],
    });
  }
  getAllRole() {
    this.api.getAllRole().subscribe((res: any) => {
      this.rolesData = res.data;
    });
  }
  togglePasswordVisibility() {
    const inputanPassword = document.querySelector('#password');
    this.hideToglePassword = !this.hideToglePassword;
    inputanPassword?.setAttribute('type', 'text');
  }
  onSubmit() {
    if (this.formRegister.valid) {
      this.authApi.registrasi(this.formRegister.value).subscribe((res: any) => {
        this.route.navigate(['/auth/login']);
      });
    } else {
      alert('Silahkan Isi Form dengan Benar');
    }
  }
}
