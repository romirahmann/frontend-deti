import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsComponent } from './layouts.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ModalPictureComponent } from './modal/modal-picture/modal-picture.component';
import { ModalLemburComponent } from './modal/modal-lembur/modal-lembur.component';
import { ModalAbsensiComponent } from './modal/modal-absensi/modal-absensi.component';

@NgModule({
  declarations: [
    LayoutsComponent,
    SidebarComponent,
    ModalPictureComponent,
    ModalLemburComponent,
    ModalAbsensiComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [ModalPictureComponent, ModalLemburComponent, ModalAbsensiComponent],
})
export class LayoutsModule {}
