import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-laporan-lembur',
  templateUrl: './laporan-lembur.component.html',
  styleUrls: ['./laporan-lembur.component.scss'],
})
export class LaporanLemburComponent {
  userLogin!: any;
  dataReceived: any;

  reports!: any;

  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {}
  ngOnInit() {
    this.getUserLogin();
  }
  getUserLogin() {
    this.userLogin = this.authService.getUserLogin();
    this.getAllReportByUserId();
  }

  getAllReportByUserId() {
    const id = this.userLogin.user_id;
    this.apiService.getAllReportByUserId(id).subscribe((res: any) => {
      console.log(res.data);
      this.reports = res.data;
    });
  }

  toogleModal(category_toogle: number, report: any) {
    if (category_toogle === 1) {
      let data = {
        text: '',
        category: 'ADD_REPORT',
        user_id: this.userLogin.user_id,
        funct: 'removeFoto',
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-report');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 2) {
      let data = {
        text: '',
        category: 'EDIT_REPORT',
        dataFoto: report,
        funct: 'removeFoto',
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-report');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 3) {
      let data = {
        text: '',
        category: 'REMOVE_MODAL',
        dataFoto: report,
        funct: 'removeReport',
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-report');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 0) {
      this.getAllReportByUserId();
      const modal = document.querySelector('#modal-report');
      modal?.classList.toggle('hidden');
    }
  }
}
