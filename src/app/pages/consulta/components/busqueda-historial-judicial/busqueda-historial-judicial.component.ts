import { Component, OnInit } from '@angular/core';
import { Condenas, FiltroHistorialModel, ConsultaCondenasResModel } from '../../core/models/ConsultaCondenas.model';
import { Router } from '@angular/router';
import { LoginService } from '../../../autenticacion/core/services/login.service';
import { ConsultarHistorialJudicialService } from '../../core/services/consultar-historial-judicial.service'
import Swal from 'sweetalert2';
import { ConsultaPrisionPreventivaResModel, PrisionPreventiva } from '../../core/models/ConsultaPrisionPreventiva.model';

import { Store } from '@ngrx/store';
import * as actions from 'src/app/pages/shared/store/actions';
import { AppHjState } from '../../../NgRx/hj.reducers';
import { ConsultaReniecReqModel, ConsultaReniecResModel } from '../../core/models/ConsultaReniec.model';

@Component({
  selector: 'app-busqueda-historial-judicial',
  templateUrl: './busqueda-historial-judicial.component.html',
  styleUrls: ['./busqueda-historial-judicial.component.scss']
})
export class BusquedaHistorialJudicialComponent implements OnInit {
  portada:boolean=true;
  error:boolean=false;
  //---------------------------
  listener: any;
  scrollMov: boolean = true;
  display_sidebar:boolean=false;
  btn_panel_filter:boolean=false;
  //-----------
  condenas: Condenas[] =[];
  prisionesPreventiva: PrisionPreventiva[] = [];
  cargandoCondena: boolean = false;
  cargandoPrision: boolean = false;
  //-----------
  labelNombreReniec: string = "";
  constructor(private route: Router, 
    private loginService: LoginService, 
    private consultarHistorialJudicialService: ConsultarHistorialJudicialService,
    private store: Store<AppHjState>) { }

  ngOnInit(): void {
    //console.log("url opcion",this.route.url);
    //this.loginService.verificarPermisos(this.route.url);
  }

  buscarHistorial(filtro:FiltroHistorialModel){
    //console.log(filtro);
    this.display_sidebar = false

    if(this.validarConsulta(filtro)){
      filtro.nombres = filtro.nombres.trim().toUpperCase();
      filtro.apellidoPaterno = filtro.apellidoPaterno.trim().toUpperCase();
      filtro.apellidoMaterno = filtro.apellidoMaterno?.trim().toUpperCase();
      //----
      this.consultarCondena(filtro);
      this.consultarPrisionPreventiva(filtro);
    }
  }
  consultarCondena(filtro: FiltroHistorialModel){
    this.cargandoCondena = true;
    this.condenas =[];
    //this.store.dispatch(actions.mostrarCargando({ estado: true}));
    this.consultarHistorialJudicialService.consultarCondenas({...filtro}).subscribe({
      next:(data:ConsultaCondenasResModel) => {
        console.log("condenas", data);
        if(data.codigo==="001"){
          this.condenas = [...data.data];
        }
        else{
          Swal.fire('Atención!', data.descripcion, 'info');
        }
      },
      complete:() => {
        this.portada = false;
        this.cargandoCondena = false
        //this.store.dispatch(actions.mostrarCargando({ estado: false}));
      },
      error:(err) => {
        this.portada = false;
        this.cargandoCondena = false
        //this.store.dispatch(actions.mostrarCargando({ estado: false}));
        Swal.fire('Atención!', err, 'warning');
      }
    });
  }

  consultarPrisionPreventiva(filtro: FiltroHistorialModel){
    this.cargandoPrision = true
    this.prisionesPreventiva=[];
    //this.store.dispatch(actions.mostrarCargando({ estado: true}));
    this.consultarHistorialJudicialService.consultarPrisionPreventiva({...filtro}).subscribe({
      next:(data:ConsultaPrisionPreventivaResModel) => {
        console.log("Prision preventiva", data);
        if(data.codigo==="001"){
          this.prisionesPreventiva = [...data.data];
        }
        else{
          Swal.fire('Atención!', data.descripcion, 'info');
        }
      },
      complete:() => {
        this.portada = false;
        this.cargandoPrision = false;
        //this.store.dispatch(actions.mostrarCargando({ estado: false}));
      },
      error:(err) => {
        this.portada = false;
        this.cargandoPrision = false;
        //this.store.dispatch(actions.mostrarCargando({ estado: false}));
        Swal.fire('Atención!', err, 'warning');
      }
    });
  }

  validarConsulta(filtro:FiltroHistorialModel):boolean{

    if(filtro.tipoConsulta==="D"){
      if(filtro.documento && filtro.documento.trim()!=""){
        return true;
      }
      else{
        Swal.fire('Atención!', 'El documento de identidad es un campo requerido', 'info');
        return false;
      }
    }
    if(filtro.tipoConsulta==="N"){
      filtro.documento = "";
      if( filtro.nombres && filtro.nombres.trim()!="" &&
      filtro.apellidoPaterno && filtro.apellidoPaterno.trim()!=""){
        return true;
      }
      else{
        Swal.fire('Atención!', 'Es necesario ingresar al menos el Nombre y Apellido paterno para realizar la búsqueda', 'info');
        return false;
      }
    }
    return false;
  }

  changeDni(filtroReniec: ConsultaReniecReqModel){
    this.consultarReniec(filtroReniec);
  }

  consultarReniec(reniecReq: ConsultaReniecReqModel):void{
    this.labelNombreReniec = "";
    this.consultarHistorialJudicialService.consultarReniec({...reniecReq}).subscribe({
      next:(data:ConsultaReniecResModel) => {
        console.log("reniec", data);
        if(data.codigo==="001"){
          this.labelNombreReniec = `${data.data.nombres} ${data.data.apellidoPaterno} ${data.data.apellidoMaterno}`;
        }
        else{
         console.log(data);
        }
      },
      complete:() => {
        //this.store.dispatch(actions.mostrarCargando({ estado: false}));
      },
      error:(err) => {
        this.labelNombreReniec = "";
        console.log(err);
        //Swal.fire('Atención!', err, 'warning');
      }
    });
  }

  show_btn_panel():void{
    this.btn_panel_filter =true;
  }

  hide_btn_panel():void{
    this.btn_panel_filter =false;
  }

}
