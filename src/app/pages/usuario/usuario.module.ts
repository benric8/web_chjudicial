import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ButtonModule} from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { PanelModule } from 'primeng/panel';
import { RippleModule } from 'primeng/ripple';

import { UsuarioRoutingModule } from './routers/usuario-routing.module';
import { CambiarContraseniaComponent } from './components/cambiar-contrasenia/cambiar-contrasenia.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CambiarContraseniaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsuarioRoutingModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    PanelModule,
    RippleModule,
    SharedModule
  ]
})
export class UsuarioModule { }
