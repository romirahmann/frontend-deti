import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LaporanLemburComponent } from './laporan-lembur/laporan-lembur.component';


@NgModule({
  declarations: [
    LaporanLemburComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
