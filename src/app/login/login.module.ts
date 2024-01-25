import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MaskitoDirective } from '@maskito/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { RegisterContainerComponent } from '../register-container/register-container.component';

import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    MaskitoDirective,
    ReactiveFormsModule
  ],
  declarations: [LoginPage, RegisterContainerComponent]
})
export class LoginPageModule {}
