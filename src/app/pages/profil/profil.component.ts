import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent {
  userLogin!: any;
  dataReceived: any;
  totalLembur: number = 0;
  totalAbsen: number = 0;
  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {}
  ngOnInit() {
    this.getUserLogin();
  }

  getUserLogin() {
    this.userLogin = this.authService.getUserLogin();
    console.log(this.userLogin);
    this.getTotalLembur();
    this.getTotalAbsensi();
  }

  toogleModal(category_toogle: number, foto: any) {
    if (foto !== null) {
      if (category_toogle === 1) {
        let data = {
          category: 'ADD_FOTO',
          dataFoto: foto,
          funct: 'removeFoto',
        };
        this.dataReceived = data;
        const modal = document.querySelector('#modal-picture');
        modal?.classList.toggle('hidden');
      }
      if (category_toogle === 2) {
        let data = {
          text: `This Profile?`,
          category: 'REMOVE_MODAL',
          dataFoto: foto,
          funct: 'removeFoto',
        };
        this.dataReceived = data;
        const modal = document.querySelector('#modal-picture');
        modal?.classList.toggle('hidden');
      }
    } else {
      this.getUserLogin();
      const modal = document.querySelector('#modal-picture');
      modal?.classList.toggle('hidden');
    }
  }

  getTotalLembur() {
    this.apiService
      .getTotalReportByUser(this.userLogin.user_id)
      .subscribe((res: any) => {
        this.totalLembur = res.data[0].total_laporan_lembur;
      });
  }
  getTotalAbsensi() {
    this.apiService
      .getTotalAbsenByUser(this.userLogin.user_id)
      .subscribe((res: any) => {
        this.totalAbsen = res.data[0].total_absensi;
      });
  }
}
