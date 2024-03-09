import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  userLogin!: any;

  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.getUserLogin();
  }

  getUserLogin() {
    this.userLogin = this.authService.getUserLogin();
    // console.log(this.userLogin);
    if (this.userLogin.filenmae) {
      this.getFile();
    }
  }

  logout() {
    this.authService.logout();
  }

  getFile() {
    this.apiService
      .getFile(this.userLogin.foto_profil)
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
