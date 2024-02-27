import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../autenticacion/core/services/login.service';
import { CambioContraseniaRequest, CambioContraseniaResponse } from '../../core/models/usuario.model';
import { Usuario } from '../../../autenticacion/core/models/LoginResponse.model';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../core/services/usuario.service';

import { Store } from '@ngrx/store';
import * as actions from 'src/app/pages/shared/store/actions';
import { AppHjState } from '../../../NgRx/hj.reducers';

@Component({
  selector: 'app-cambiar-contrasenia',
  templateUrl: './cambiar-contrasenia.component.html',
  styleUrls: ['./cambiar-contrasenia.component.scss']
})
export class CambiarContraseniaComponent implements OnInit {
  cambioClave: CambioContraseniaRequest;
  usuario: Usuario;
  constructor(private route: Router, 
    private usuarioService:UsuarioService,
    private loginService: LoginService,
    private store: Store<AppHjState>
    ) { 
    this.usuario = loginService.getUsuario();
    this.cambioClave = new CambioContraseniaRequest(this.usuario.usuario ,'','','');
  }

  ngOnInit(): void {
    //this.loginService.verificarPermisos(this.route.url);
  }
  cambiarContrasenia():void{
    if(!this.cambioClave.claveNueva || !this.cambioClave.claveActual || !this.cambioClave.claveConfirm){
      Swal.fire('Atención!', 'Todos los campos son obligatorios.', 'warning');
      return;
    }
    if(this.cambioClave.claveNueva != this.cambioClave.claveConfirm){
      Swal.fire('Atención!', 'La contraseña nueva no coincide.', 'warning');
      return;
    }
    this.store.dispatch(actions.mostrarCargando({ estado: true}));
    this.usuarioService.cambiarContrasenia({...this.cambioClave}).subscribe({
      next:(data:CambioContraseniaResponse)=>{
        if(data.codigo==="001"){
          Swal.fire('Exito', data.descripcion, 'success');
          this.route.navigate(['/autenticacion/login']);
        }
        else{
          Swal.fire('Atención!', data.descripcion, 'info');
        }
      },
      complete:() =>{
        this.store.dispatch(actions.mostrarCargando({ estado: false}));
      },
      error:(err) => {
        Swal.fire('Atención!', err, 'warning');
        this.store.dispatch(actions.mostrarCargando({ estado: false}));
      }
    });
  }
  volver():void{
    this.route.navigate(['/consulta/buscar-historial']);
  }
}
