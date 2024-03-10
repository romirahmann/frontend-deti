import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaporanLemburComponent } from './laporan-lembur/laporan-lembur.component';
import { ProfilComponent } from './profil/profil.component';
import { LaporanAbsensiComponent } from './laporan-absensi/laporan-absensi.component';

const routes: Routes = [
  { path: '', component: LaporanLemburComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'absensi', component: LaporanAbsensiComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
