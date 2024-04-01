import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LaporanLemburComponent } from './laporan-lembur/laporan-lembur.component';
import { ProfilComponent } from './profil/profil.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { LaporanAbsensiComponent } from './laporan-absensi/laporan-absensi.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExportPdfComponent } from './export-pdf/export-pdf.component';
import { DetailComponent } from './export-pdf/detail/detail.component';
import { DataMasterComponent } from './data-master/data-master.component';

@NgModule({
  declarations: [
    LaporanLemburComponent,
    ProfilComponent,
    LaporanAbsensiComponent,
    ExportPdfComponent,
    DetailComponent,
    DataMasterComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    LayoutsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class PagesModule {}
