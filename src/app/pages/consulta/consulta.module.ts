import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaRoutingModule } from './routers/consulta-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {PanelModule} from 'primeng/panel';
import {PaginatorModule} from 'primeng/paginator';
import {RadioButtonModule} from 'primeng/radiobutton';
import {TabViewModule} from 'primeng/tabview';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {RippleModule} from 'primeng/ripple';
import {DividerModule} from 'primeng/divider';
import {SidebarModule} from 'primeng/sidebar';
import {ToolbarModule} from 'primeng/toolbar';
import {InputMaskModule} from 'primeng/inputmask';
//import {SkeletonModule} from 'primeng/skeleton';
//import {ProgressBarModule} from 'primeng/progressbar';

import { BusquedaHistorialJudicialComponent } from './components/busqueda-historial-judicial/busqueda-historial-judicial.component';
import { BusquedaHiJuFiltrosComponent } from './components/busqueda-historial-judicial/busqueda-hi-ju-filtros/busqueda-hi-ju-filtros.component';

import { SharedModule } from '../shared/shared.module';
import { BusquedaHistorialDetalleComponent } from './components/busqueda-historial-judicial/busqueda-historial-detalle/busqueda-historial-detalle.component';
@NgModule({
  declarations: [
    BusquedaHistorialJudicialComponent,
    BusquedaHiJuFiltrosComponent,
    BusquedaHistorialDetalleComponent
  ],
  imports: [
    CommonModule,
    ConsultaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    PanelModule,
    PaginatorModule,
    RadioButtonModule,
    TabViewModule,
    OverlayPanelModule,
    RippleModule,
    DividerModule,
    SidebarModule,
    ToolbarModule,
    SharedModule,
    InputMaskModule,
    //ProgressBarModule,
    //SkeletonModule
  ]
})
export class ConsultaModule { }
