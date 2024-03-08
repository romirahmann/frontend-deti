import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsComponent } from './layouts.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [LayoutsComponent, SidebarComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class LayoutsModule {}
