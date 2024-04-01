import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaporanLemburComponent } from './laporan-lembur/laporan-lembur.component';
import { ProfilComponent } from './profil/profil.component';
import { LaporanAbsensiComponent } from './laporan-absensi/laporan-absensi.component';
import { ExportPdfComponent } from './export-pdf/export-pdf.component';
import { DetailComponent } from './export-pdf/detail/detail.component';
import { DataMasterComponent } from './data-master/data-master.component';

const routes: Routes = [
  { path: '', component: LaporanLemburComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'absensi', component: LaporanAbsensiComponent },
  { path: 'export-pdf-page', component: ExportPdfComponent },
  { path: 'export-pdf-detail', component: DetailComponent },
  { path: 'data-master', component: DataMasterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
