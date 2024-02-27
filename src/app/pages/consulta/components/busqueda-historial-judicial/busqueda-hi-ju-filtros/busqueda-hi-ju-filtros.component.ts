import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FiltroHistorialModel } from '../../../core/models/ConsultaCondenas.model';
import { PrimeNGConfig } from 'primeng/api';
import { ConsultaReniecReqModel } from '../../../core/models/ConsultaReniec.model';

@Component({
  selector: 'app-busqueda-hi-ju-filtros',
  templateUrl: './busqueda-hi-ju-filtros.component.html',
  styleUrls: ['./busqueda-hi-ju-filtros.component.scss']
})
export class BusquedaHiJuFiltrosComponent implements OnInit {
  @Input() sidebar: boolean=false;
  @Input() cargandoCondena: boolean = false;
  @Input() cargandoPrision: boolean = false;
  @Input() nombreReniec: string = "";
  filtroHistorial: FiltroHistorialModel;
  @Output() onConsultar: EventEmitter<FiltroHistorialModel> = new EventEmitter();
  @Output() onChangeDni: EventEmitter<ConsultaReniecReqModel> = new EventEmitter();
  constructor(private primengConfig: PrimeNGConfig) { 
    this.filtroHistorial = new FiltroHistorialModel('','','','','D');
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  consultar():void{
    this.onConsultar.emit({ ...this.filtroHistorial });
  }
  
  changeDni():void{
    if(this.filtroHistorial.tipoConsulta==="D"){
      if(this.filtroHistorial.documento && this.filtroHistorial.documento.trim().length ==8){
        this.onChangeDni.emit(new ConsultaReniecReqModel(this.filtroHistorial.documento));
      }
    }
  }

}
