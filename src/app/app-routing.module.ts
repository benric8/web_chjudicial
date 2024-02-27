import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /* { path: '', redirectTo: 'admin', pathMatch: 'full' }, */
  { path: '', redirectTo: 'autenticacion', pathMatch: 'full' },
  { path: 'autenticacion', loadChildren: () => import('./pages/autenticacion/autenticacion.module').then(m => m.AutenticacionModule)},
  { path: 'consulta', loadChildren: () => import('./pages/consulta/consulta.module').then(m => m.ConsultaModule)},
  { path: 'usuario', loadChildren: () => import('./pages/usuario/usuario.module').then(m => m.UsuarioModule)},
  { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
