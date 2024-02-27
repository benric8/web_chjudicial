import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {BusquedaHistorialJudicialComponent} from '../components/busqueda-historial-judicial/busqueda-historial-judicial.component'
import {LayoutComponent} from '../../shared/components/layout/layout.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'buscar-historial', pathMatch: 'full' },
      { path: 'buscar-historial', component: BusquedaHistorialJudicialComponent, data: { title: 'Busqueda historial' }},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaRoutingModule { }
