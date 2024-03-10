import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LaporanLemburComponent } from './laporan-lembur/laporan-lembur.component';
import { ProfilComponent } from './profil/profil.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { LaporanAbsensiComponent } from './laporan-absensi/laporan-absensi.component';

@NgModule({
  declarations: [LaporanLemburComponent, ProfilComponent, LaporanAbsensiComponent],
  imports: [CommonModule, PagesRoutingModule, LayoutsModule],
})
export class PagesModule {}
