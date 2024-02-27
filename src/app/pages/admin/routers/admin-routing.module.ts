import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MantenimientoEntidadesComponent } from '../components/mantenimiento-entidades/mantenimiento-entidades.component';
import { MantenimientoUsuariosComponent } from '../components/mantenimiento-usuarios/mantenimiento-usuarios.component';

import { LayoutAdminModule } from '../../layout-admin/layout-admin.module';
import { LayoutAdminComponent } from '../../layout-admin/components/layout-admin/layout-admin.component';

const routes: Routes = [
   {path: '', component: LayoutAdminComponent,
      children: [
        { path: 'entidades', component: MantenimientoEntidadesComponent, data: { title: "Entidades"}},
        { path: 'usuarios', component: MantenimientoUsuariosComponent, data: { title: "Usuarios"}}
      ]
  } 

/*   { path: '', redirectTo: 'init', pathMatch: 'full' },
  { path: 'init', component: LayoutAdminComponent, data: { title: 'Login' }} */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
