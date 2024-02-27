import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AutenticacionRoutingModule } from './routers/autenticacion-routing.module';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RippleModule} from 'primeng/ripple';
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import {InputTextModule} from 'primeng/inputtext';
import {TooltipModule} from 'primeng/tooltip';
import {DividerModule} from 'primeng/divider';
import {ProgressBarModule} from 'primeng/progressbar';
import {BlockUIModule} from 'primeng/blockui';
import {PanelModule} from 'primeng/panel';

import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { LoginComponent } from './components/login/login.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent, 
  ],
  imports: [
    CommonModule,
    AutenticacionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RippleModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    TooltipModule,
    RecaptchaModule,
    DividerModule,
    ProgressBarModule,
    BlockUIModule,
    PanelModule,
    SharedModule
  ]
})
export class AutenticacionModule { }
