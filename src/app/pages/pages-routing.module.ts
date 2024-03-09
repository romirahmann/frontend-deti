import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaporanLemburComponent } from './laporan-lembur/laporan-lembur.component';
import { ProfilComponent } from './profil/profil.component';

const routes: Routes = [
  { path: '', component: LaporanLemburComponent },
  { path: 'profil', component: ProfilComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
