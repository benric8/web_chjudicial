import { Component, OnInit, Input } from '@angular/core';
import { Condenas } from '../../../core/models/ConsultaCondenas.model';
import { PrisionPreventiva } from '../../../core/models/ConsultaPrisionPreventiva.model';

@Component({
  selector: 'app-busqueda-historial-detalle',
  templateUrl: './busqueda-historial-detalle.component.html',
  styleUrls: ['./busqueda-historial-detalle.component.scss']
})
export class BusquedaHistorialDetalleComponent implements OnInit {
  @Input() listaCondenas: Condenas[] = [];
  @Input() listaPrisionesPreventiva: PrisionPreventiva[] = [];
  @Input() cargandoCondena: boolean = false;
  @Input() cargandoPrision: boolean = false;
  @Input() noPortada: boolean = false;
  constructor() {
   }

  ngOnInit(): void {
  }

}
