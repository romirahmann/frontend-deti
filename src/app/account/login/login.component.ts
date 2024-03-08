import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formLogin!: FormGroup;
  hideToglePassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router
  ) {}
  ngOnInit() {
    this.getFormLogin();
  }
  getFormLogin() {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  togglePasswordVisibility() {
    const inputanPassword = document.querySelector('#password');
    this.hideToglePassword = !this.hideToglePassword;
    inputanPassword?.setAttribute('type', 'text');
  }
  onSubmit() {
    this.authService.login(this.formLogin.value).subscribe((res: any) => {
      this.authService.savetoken(res.token, res.data);
      this.route.navigate(['']);
    });
  }
}
