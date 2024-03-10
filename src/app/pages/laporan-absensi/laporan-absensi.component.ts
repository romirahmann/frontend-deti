import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environment/environment.prod';

@Component({
  selector: 'app-laporan-absensi',
  templateUrl: './laporan-absensi.component.html',
  styleUrls: ['./laporan-absensi.component.scss'],
})
export class LaporanAbsensiComponent {
  userLogin!: any;
  dataReceived: any;
  reports!: any;
  displayReports!: any;

  // pagination
  pageSize: number = 20;
  currentPage: number = 1;
  totalPages: number = 0;
  entires: any;
  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {}
  ngOnInit() {
    this.getUserLogin();
  }
  getUserLogin() {
    this.userLogin = this.authService.getUserLogin();
    this.getReportsAbsensi();
  }

  getReportsAbsensi() {
    const id = this.userLogin.user_id;
    this.apiService.getAllAbsensiByUserId(id).subscribe((res: any) => {
      this.reports = res.data;
      this.entires = this.reports.length;
      this.calculateTotalPages();
      this.updateDisplayReports();
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
        reports: report,
        funct: 'removeFoto',
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-report');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 3) {
      let data = {
        text: 'report',
        category: 'REMOVE_MODAL',
        reports: report,
        funct: 'removeReport',
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-report');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 0) {
      this.getReportsAbsensi();
      const modal = document.querySelector('#modal-report');
      modal?.classList.toggle('hidden');
    }
  }

  // Pagination
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.entires / this.pageSize);
  }

  updateDisplayReports() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayReports = this.reports.slice(startIndex, endIndex);
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayReports();
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayReports();
    }
  }
  getStartIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }
  getEndIndex(): number {
    const endIndex: number = this.currentPage * this.pageSize;
    return Math.min(endIndex, this.entires);
  }
}
