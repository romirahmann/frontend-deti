import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {
  dataFilterDate!: any;
  dataReports!: any;
  totalJamAkumulasi!: number;
  @ViewChild('templatePDF', { static: false }) templatePDF!: ElementRef;
  constructor(
    private apiService: ApiService,
    private activeRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.getdataParams();
  }
  getdataParams() {
    this.activeRoute.queryParams.subscribe((params) => {
      this.dataFilterDate = params;
      const month = parseInt(this.dataFilterDate?.month);
      const year = parseInt(this.dataFilterDate?.year);
      const id = parseInt(this.dataFilterDate.user_id);
      this.getDataReportAkumulasi(id, month, year);
    });
  }
  getDataReportAkumulasi(id: number, month: number, year: number) {
    this.apiService.getAllAkumulasiReport(3, 3, 2024).subscribe((res: any) => {
      console.log(res.data);
      this.dataReports = res.data.daftarReport;
      this.totalJamAkumulasi = res.data.totalDuration;
    });
  }
  generatePDF() {
    const options = {
      margin: 0.2,
      filename: 'report_lembur.pdf',
      image: { type: 'png', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait' },
    };

    const element = this.templatePDF.nativeElement;

    html2pdf().from(element).set(options).save();
  }
}
