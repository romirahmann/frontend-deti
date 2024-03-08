import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaporanLemburComponent } from './laporan-lembur/laporan-lembur.component';

const routes: Routes = [{ path: '', component: LaporanLemburComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
