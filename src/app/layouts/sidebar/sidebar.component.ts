import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  userLogin!: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.getUserLogin();
  }

  getUserLogin() {
    this.userLogin = this.authService.getUserLogin();
    console.log(this.userLogin);
  }

  logout() {
    this.authService.logout();
  }
}
