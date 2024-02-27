import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MantenimientoService } from '../../core/services/mantenimiento.service';
import Swal from 'sweetalert2';

import * as actions from 'src/app/pages/shared/store/actions';
import { AppHjState } from '../../../NgRx/hj.reducers';
import { ActualizarUsuarioResponse, CrearUsuarioResponse, Entidad, EntidadesResponse, Usuario, UsuariosResponse, Perfil, PerfilesResponse, ValidarDocumentoModel } from '../../core/models/Maestras.model';

@Component({
  selector: 'app-mantenimiento-usuarios',
  templateUrl: './mantenimiento-usuarios.component.html',
  styleUrls: ['./mantenimiento-usuarios.component.scss']
})
export class MantenimientoUsuariosComponent implements OnInit {

  usuarioDialog: boolean= false;
  listaUsuarios: Usuario[] = [];
  listaEntidades: Entidad[] = [];
  listaPerfiles: Perfil[] = [];

  editarUsuario: boolean= false;
  estadosUsuario: any[]=[];

  documento: ValidarDocumentoModel={
     dni: "" 
  };

  resetPassword:boolean=false;
  listaOrigen: Usuario[]=[];

  usuario: Usuario ={
    id : 0,
    usuario: "",
    contrasenia: "",
    nombres: "",
    apellidoPaterno: null,
    apellidoMaterno: null,
    numeroDocumento: "",
    correo: "",
    entidad: "0",
    perfil: "0",
    activo: ""
  }

  constructor(
      private store: Store<AppHjState>,
      private mantenimientoService: MantenimientoService
      ) { 

    this.listarUsuarios();
    this.listarEntidades();
    this.listarPerfiles();

    this.estadosUsuario =  [
      {value:'1', label:'Activo'},
      {value:'0', label:'Inactivo'}
    ];   
  }

  ngOnInit(): void {
  }
  
  listarUsuarios():void{
    this.mantenimientoService.getUsuarios("").subscribe({
      next:(response:UsuariosResponse)=>{
        console.log(response.data);
        this.listaUsuarios = response.data;
        
      },
      complete:()=>{
        console.log('request complete');
      },
      error:(err)=>{
        console.log("error autorization",err);
        Swal.fire('Atención!', "Error en la conexión con el servicio, recargue la página.", 'warning');
      }
    }); 
  }

  limpiarNombres(){
    this.usuario.nombres = "";
    this.usuario.apellidoPaterno = "";
    this.usuario.apellidoMaterno = "";
  }

  validarDocumento(event : Event){
    if(this.usuario.numeroDocumento !==null && this.usuario.numeroDocumento!==undefined && this.usuario.numeroDocumento!==""){
      this.documento.dni = this.usuario.numeroDocumento;
      this.mantenimientoService.validarDocumentoIdentidad(this.documento).subscribe(
      {next:(data: any)=>{
        if(data.data!==null && data.data!==undefined){
            this.usuario.apellidoPaterno = data.data.apellidoPaterno;
            this.usuario.apellidoMaterno = data.data.apellidoMaterno;
            this.usuario.nombres = data.data.nombres;
            this.usuario.usuario = this.documento.dni;
          }else {
            Swal.fire('Info!', data.descripcion , 'info');
          }
        },
      error:(err)=>{
          console.log("error autorization",err);
          Swal.fire('Atención!', "Error en la conexión con el servicio de RENIEC.", 'warning');
        }
      }      
      );
    } else{
      Swal.fire('Info!', "Ingrese un número de documento." , 'info');
    }
  }

  validarNumeroDocumento(evento: any) {
    const valorActual = evento;
    if (/[^0-9]/.test(valorActual)) {
      this.usuario.numeroDocumento = '';
    } else {
      this.usuario.numeroDocumento = valorActual;
    }
  }  

  nuevoUsuario() {
    this.usuario ={
      id : 0,
      usuario: '',
      contrasenia: '',
      nombres: '',
      apellidoPaterno: null,
      apellidoMaterno: null,
      numeroDocumento: '',
      correo: '',
      entidad: "0",
      perfil: "0",
      activo: ''
    }
    this.editarUsuario = false;
    this.usuarioDialog = true;
    this.resetPassword = false;
  }
  
  verEditarUsuario(usr: Usuario) {
    console.log(usr);
    this.usuario = {...usr};
    this.resetPassword = false;
    this.editarUsuario = true;
    this.usuarioDialog = true;
  }

  guardarCambiosEventClick():void{
    if(this.usuario.id==0){
      this.crearUsuario();
    }
    else{
      this.actualizarUsuario();
    }
  }
  crearUsuario():void{
    this.store.dispatch(actions.mostrarCargando({ estado: true}));
    console.log(this.usuario);
    this.usuario.contrasenia = this.usuario.numeroDocumento;
    this.mantenimientoService.postCrearUsuario({...this.usuario}).subscribe({
      next:(data: CrearUsuarioResponse)=>{
        if(data.codigo==="0000"){
          this.store.dispatch(actions.mostrarCargando({ estado: false}));
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            html:
            data.descripcion+'<br/>' +
            'Usuario: ' + this.usuario.usuario,
          });
          this.usuarioDialog = false;
        }
        else{
          this.store.dispatch(actions.mostrarCargando({ estado: false}));
          Swal.fire({
            icon: 'info',
            title: 'Atención!',
            text: data.descripcion
          })            
        }
      },
      complete:()=>{
        this.listarUsuarios();
      },
      error:(err)=>{
        console.log("error autorization",err);
        Swal.fire('Atención!', "Error en la conexión con el servicio, recargue la página.", 'warning');
      }
    });
  }

  actualizarUsuario():void{
    console.log(this.usuario);
    (this.resetPassword == true) ? this.usuario.contrasenia = "1" : this.usuario.contrasenia = "0";
    this.store.dispatch(actions.mostrarCargando({ estado: true}));
    this.mantenimientoService.putActualizarUsuario({...this.usuario}).subscribe({
      next:(data: ActualizarUsuarioResponse)=>{
        if(data.codigo==="0000"){
          this.store.dispatch(actions.mostrarCargando({ estado: false}));
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            html:
            data.descripcion+'<br/>' +
            'Usuario: ' + this.usuario.usuario,
          });
          this.usuarioDialog = false;
          
        }
        else{
          this.store.dispatch(actions.mostrarCargando({ estado: false}));
          Swal.fire({
            icon: 'info',
            title: 'Atención!',
            text: data.descripcion
          })            
        }
      },
      complete:()=>{
        this.listarUsuarios();
      },
      error:(err)=>{
        console.log("error autorization",err);
        Swal.fire('Atención!', "Error en la conexión con el servicio, recargue la página.", 'warning');
      }
    }); 
  }

  listarEntidades():void{
    this.mantenimientoService.getEntidadesActivas().subscribe({
      next:(response:EntidadesResponse)=>{
        this.listaEntidades = response.data;
        console.log("lista de entidades: ",this.listaEntidades);
      },
      complete:()=>{
        console.log('request complete');
      },
      error:(err)=>{
        console.log("error autorization",err);
        Swal.fire('Atención!', "Error en la conexión con el servicio, recargue la página.", 'warning');
      }
    });
    } 

    listarPerfiles():void{
      this.mantenimientoService.getPerfiles().subscribe({
        next:(response:PerfilesResponse)=>{
          console.log("lista de data: ",response.data);
          this.listaPerfiles = response.data;
          console.log("lista de perfiles: ",this.listaPerfiles);
        },
        complete:()=>{
          console.log('request complete');
        },
        error:(err)=>{
          console.log("error autorization",err);
          Swal.fire('Atención!', "Error en la conexión con el servicio, recargue la página.", 'warning');
        }
      });
      } 

      evaluarPerfil(idPerfil:string):string{
        let res = "DESCONOCIDO";
        this.listaPerfiles.forEach((value: Perfil, index:number) => {
          if(value.id == idPerfil){
            res = value.perfil;
          }
        });
        return res;
      }
}
