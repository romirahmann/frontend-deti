import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutsModule } from '../layouts/layouts.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    LayoutsModule,
    HttpClientModule,
  ],
})
export class AccountModule {}
