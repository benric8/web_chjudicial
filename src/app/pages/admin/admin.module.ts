import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TableModule } from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';

import { MantenimientoEntidadesComponent } from './components/mantenimiento-entidades/mantenimiento-entidades.component';
import { MantenimientoUsuariosComponent } from './components/mantenimiento-usuarios/mantenimiento-usuarios.component';

import { AdminRoutingModule } from './routers/admin-routing.module';
import { LayoutAdminModule } from '../layout-admin/layout-admin.module';

@NgModule({
  declarations: [
    MantenimientoEntidadesComponent,
    MantenimientoUsuariosComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutAdminModule,
    TableModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    CheckboxModule
  ]
})
export class AdminModule { }
