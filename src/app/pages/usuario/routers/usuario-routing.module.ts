import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CambiarContraseniaComponent } from '../components/cambiar-contrasenia/cambiar-contrasenia.component';
import {LayoutComponent} from '../../shared/components/layout/layout.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'cambiar-contrasenia', pathMatch: 'full' },
      { path: 'cambiar-contrasenia', component: CambiarContraseniaComponent, data: { title: 'Cambiar contrasenia' }},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
