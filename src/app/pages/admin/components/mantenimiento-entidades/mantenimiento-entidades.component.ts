import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from 'src/app/pages/shared/store/actions';
import { AppHjState } from '../../../NgRx/hj.reducers';
import { MantenimientoService } from '../../core/services/mantenimiento.service';
import Swal from 'sweetalert2';

import { ActualizarEntidadResponse, CrearEntidadResponse, Entidad, EntidadesResponse, ValidarRUCModel } from '../../core/models/Maestras.model';


@Component({
  selector: 'app-mantenimiento-entidades',
  templateUrl: './mantenimiento-entidades.component.html',
  styleUrls: ['./mantenimiento-entidades.component.scss']
})
export class MantenimientoEntidadesComponent implements OnInit {
  entidadDialog: boolean= false;
  listaEntidades: Entidad[] = [];

  editarEntidad:boolean= false;
  estadosEntidad: any[]=[];

  documento: ValidarRUCModel={
    numeroRuc : ""
  };

  listaOrigen: Entidad[]=[];

  entidad: Entidad ={
    id : "0",
    nombreEntidad : "",
    numeroDocumento: "",
    activo: ""
  }

  constructor(
      private store: Store<AppHjState>,
      private mantenimientoService: MantenimientoService
      ) { 

    this.listarEntidades();
    this.estadosEntidad =  [
      {value:'1', label:'Activo'},
      {value:'0', label:'Inactivo'}
    ];   
  }

  ngOnInit(): void {
  }
  
  listarEntidades():void{
    this.mantenimientoService.getEntidades("").subscribe({
      next:(response:EntidadesResponse)=>{
        this.listaEntidades = response.data;
        
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

  nuevoEntidad() {
    this.entidad ={
      id : "0",
      nombreEntidad : "",
      numeroDocumento: "",
      activo: ""
    }
    this.editarEntidad = false;
    this.entidadDialog = true;
  }
  
  limpiarNombres(){
    this.entidad.nombreEntidad = "";
  }

  validarNumeroDocumentoRUC(evento: any){
    const valorActual = evento;
    if (/[^0-9]/.test(valorActual)) {
      this.entidad.numeroDocumento = '';
    } else {
      this.entidad.numeroDocumento = valorActual;
    }
  }

  validarDocumentoRUC(event:Event){
    if(this.entidad.numeroDocumento !==null && this.entidad.numeroDocumento!==undefined && this.entidad.numeroDocumento!==""){
      this.documento.numeroRuc = this.entidad.numeroDocumento;
      this.mantenimientoService.validarRUC(this.documento).subscribe(
        {next:(data: any)=>{
          console.log(data);
          if(data.data!==null && data.data!==undefined && data.data.razonSocial.length > 0){
            this.entidad.numeroDocumento = data.data.nroRuc;
            this.entidad.nombreEntidad = data.data.razonSocial;
          }else {
            Swal.fire('Info!', "No se encontraron resultados." , 'info');
          }
        },
        error:(err)=>{
          console.log("error autorization",err);
          Swal.fire('Atención!', "Error en la conexión con el servicio de SUNAT.", 'warning');
        }
      });
    } else{
      Swal.fire('Info!', "Ingrese un número de documento." , 'info');
    }    
  }

  verEditarEntidad(ent: Entidad) {
    this.entidad = {...ent};
    this.editarEntidad = true;
    this.entidadDialog = true;
    console.log(this.entidad);
  }

  guardarCambiosEventClick():void{
    if(this.entidad.id=="0"){
      this.crearEntidad();
    }
    else{
      this.actualizarEntidad();
    }
  }
  crearEntidad():void{
    this.store.dispatch(actions.mostrarCargando({ estado: true}));
    this.mantenimientoService.postCrearEntidades({...this.entidad}).subscribe({
      next:(data: CrearEntidadResponse)=>{
        if(data.codigo==="0000"){
          this.store.dispatch(actions.mostrarCargando({ estado: false}));
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            html:
            data.descripcion+'<br/>' +
            'Entidad:' + this.entidad.nombreEntidad,
          });
          this.entidadDialog = false;
        }
        else{
          
          this.store.dispatch(actions.mostrarCargando({ estado: false}));
          Swal.fire('Atención!', data.descripcion+ '\n Codigo de Operacion:'+ data.codigoOperacion, 'info');
        }
      },
      complete:()=>{
        this.listarEntidades();
      },
      error:(err)=>{
        console.log("error autorization",err);
        Swal.fire('Atención!', "Error en la conexión con el servicio, recargue la página.", 'warning');
      }
    });
  }

  actualizarEntidad():void{
   this.store.dispatch(actions.mostrarCargando({ estado: true}));   
   console.log(this.entidad);
    this.mantenimientoService.putActualizarEntidad({...this.entidad}).subscribe({
      next:(data: ActualizarEntidadResponse)=>{
        if(data.codigo==="0000"){
          this.store.dispatch(actions.mostrarCargando({ estado: false}));
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            html:
            data.descripcion+'<br/>' +
            'Entidad: ' + this.entidad.nombreEntidad,
          });
          this.entidadDialog = false;
          
        }
        else{
          this.store.dispatch(actions.mostrarCargando({ estado: false}));
          Swal.fire('Atención!', data.descripcion+ '\n Codigo de Operacion:'+ data.codigoOperacion, 'info');
        }
      },
      complete:()=>{
        this.listarEntidades();
      },
      error:(err)=>{
        console.log("error autorization",err);
        Swal.fire('Atención!', "Error en la conexión con el servicio, recargue la página.", 'warning');
      }
    });
  }

}
