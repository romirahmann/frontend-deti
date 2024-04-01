import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environment/environment.prod';

@Component({
  selector: 'app-laporan-lembur',
  templateUrl: './laporan-lembur.component.html',
  styleUrls: ['./laporan-lembur.component.scss'],
})
export class LaporanLemburComponent {
  userLogin!: any;
  dataReceived: any;
  fileUrl!: string;

  reports!: any;
  displayReports!: any;
  filterDate!: any;

  // pagination
  pageSize: number = 20;
  currentPage: number = 1;
  totalPages: number = 0;
  entires: any;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private route: Router
  ) {}
  ngOnInit() {
    this.getUserLogin();
  }
  getUserLogin() {
    this.userLogin = this.authService.getUserLogin();
    if (this.userLogin.role_id === 1) {
      this.getAllReports();
    } else {
      this.getAllReportByUserId();
    }
  }

  getAllReports() {
    this.apiService.getAllReport().subscribe((res: any) => {
      this.reports = res.data;
      this.fileUrl = environment.apiUrl;
      this.entires = this.reports.length;
      this.calculateTotalPages();
      this.updateDisplayReports();
    });
  }
  getAllReportByUserId() {
    const id = this.userLogin.user_id;
    this.apiService.getAllReportByUserId(id).subscribe((res: any) => {
      this.reports = res.data;
      this.fileUrl = environment.apiUrl;
      this.entires = this.reports.length;
      this.calculateTotalPages();
      this.updateDisplayReports();
    });
  }

  toggleApproval(category_toogle: number, report: any) {
    if (category_toogle === 1) {
      let data = {
        reports: report,
      };
      this.dataReceived = data;
      const modal = document.querySelector('#modal-approval');
      modal?.classList.toggle('hidden');
    }
    if (category_toogle === 0) {
      this.getAllReports();
      const modal = document.querySelector('#modal-approval');
      modal?.classList.toggle('hidden');
    }
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
    if (category_toogle === 4) {
      let data = {
        category: 'APPROVE_MODAL',
        reports: report,
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

  // FILTER DATE
  toogleModalExport() {
    const element = document.querySelector('#filterExport-modal');
    element?.classList.toggle('hidden');
  }
  onSubmit() {
    console.log(this.filterDate);
    const [year, month] = this.filterDate.split('-');
    const data = {
      year: parseInt(year),
      month: parseInt(month),
    };

    this.route.navigate(['/export-pdf'], { queryParams: data });
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
