import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsComponent } from './layouts.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ModalPictureComponent } from './modal/modal-picture/modal-picture.component';
import { ModalLemburComponent } from './modal/modal-lembur/modal-lembur.component';

@NgModule({
  declarations: [
    LayoutsComponent,
    SidebarComponent,
    ModalPictureComponent,
    ModalLemburComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [ModalPictureComponent, ModalLemburComponent],
})
export class LayoutsModule {}
