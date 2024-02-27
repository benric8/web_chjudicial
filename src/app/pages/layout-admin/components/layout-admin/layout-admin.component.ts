import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginService } from 'src/app/pages/autenticacion/core/services/login.service';

import { Store  } from '@ngrx/store';
import { AppHjState } from '../../../NgRx/hj.reducers';

import {  Subscription } from 'rxjs';
import { MenuOpcionesSistema, Opciones, OpcionSistema } from 'src/app/pages/autenticacion/core/models/OpcionesResponse.model';


@Component({
  selector: 'app-layout-admin',
  templateUrl: './layout-admin.component.html',
  styleUrls: ['./layout-admin.component.scss']
})
export class LayoutAdminComponent implements OnInit {
  sidebarShow:boolean=false;
  display:boolean = false;

  listaOpciones:any[]=[];
  //perfil:string ='1';
  dataOpciones:MenuOpcionesSistema;
  seleccionarOpcion: Subscription = new Subscription();
  constructor(private route: Router, 
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private store: Store<AppHjState>) { 
      //this.dataOpciones = this.loginService.getOpciones();
      //console.log("data opciones",this.dataOpciones);

      this.dataOpciones = {opciones:  [ {id: 1,title:"Entidades", description: "Mantenimiento de entidades", select:false, activate:true, icon: "pi pi-building", url:"entidades", hijos:[]},
                                        {id: 1,title:"Usuarios", description: "Mantenimiento de usuarios", select:false, activate:false, icon: "pi pi-user", url:"usuarios", hijos:[]},
                          ]};

      if(this.dataOpciones){
        this.listaOpciones = this.dataOpciones.opciones;
      }
  }

  ngOnInit(): void {
    console.log(this.listaOpciones);
    //this.cleanSelected();
    //this.selectedRouteUrl(this.listaOpciones ,url);
    
    /*
    this.seleccionarOpcion = this.store.select('seleccionarOpcionMenu').subscribe(( {url} ) => {
      if(url!=""){
        console.log("seleccionar opcion",url);
        this.cleanSelected();
        this.selectedRouteUrl(this.listaOpciones ,url);
      }
    });

    
    if(this.dataOpciones){
      console.log("generando.....");
      //this.generateOpcionesSistema(this.dataOpciones.opciones,'');
      this.listaOpciones = this.dataOpciones.opciones;

    }*/

  }
  sidebarOnChange(event:any):void{
    /* console.log("event layout",event); */
    this.sidebarShow = event;
  }
  drawableOnChange(event:any):void{
    this.display = event;
  }

  cleanSelected():void{
    this.listaOpciones.forEach(function(element){
      element.select = false;
    });
  }
  goRoute(indice:number):void{
    if(indice>=0){
        this.cleanSelected();
        console.log(this.listaOpciones);
        this.listaOpciones[indice].select=true;
        this.route.navigate([''+this.listaOpciones[indice].url], {relativeTo: this.activatedRoute});
        //this.route.navigate(['/consulta/buscar-historial']);
      } 
  }


  goOpcion(listaOps:OpcionSistema[], id:number):void{
    console.log("opcion seleccinado", id);
    for(let i =0;i<listaOps.length;i++){
      if(listaOps[i].hijos.length>0){
        this.goOpcion(listaOps[i].hijos, id);
      }
      else{
        if(listaOps[i].id === id){
          listaOps[i].select=true;
          this.route.navigate([listaOps[i].url], {relativeTo: this.activatedRoute});
          break;
        }
      }
    }
  }

  onActivateEvent(id:number){
    console.log("activar opcion ",id);
    //this.activateOpcion(this.listaOpciones, id);
    //console.log("opciones actualizadas", this.listaOpciones);
  }

  activateOpcion(listaOps:OpcionSistema[], id:number):void{
    //console.log("activando.....", id);
    for(let i =0;i<listaOps.length;i++){
      //console.log("opcion verificado",listaOps[i]);
      if(listaOps[i].id == id){
        listaOps[i].activate = !listaOps[i].activate;
        break;
      }
      else{
        if(listaOps[i].hijos.length>0){
          this.activateOpcion(listaOps[i].hijos, id);

        }
      }
      
    }
  }

  selectedRouteUrl(listaOps:OpcionSistema[], uri:string):boolean{
    let seleccionado:boolean = false;
    /*
    for(let i:number=0;i<this.listaOpciones.length;i++){
      if(this.listaOpciones[i].uri === uri){
        this.listaOpciones[i].select=true;
        break;
      }
    }*/
    for(let i =0;i<listaOps.length;i++){
      //console.log(listaOps[i].url);
      if(listaOps[i].hijos.length>0){
        let seleccion:boolean =this.selectedRouteUrl(listaOps[i].hijos, uri);
        if(seleccion){
          listaOps[i].activate = true;
          seleccionado = true;
          break;
        }
      }
      else{
        if(listaOps[i].url == uri){
          listaOps[i].select=true;
          //this.route.navigate([uri+listaOps[i].url], {relativeTo: this.activatedRoute});
          return true;
          //break;
        }
      }
    }
    return seleccionado;
  }
  generateOpcionesSistema(listaOps:OpcionSistema[], urlIni:String):void{
    for(let i =0;i<listaOps.length;i++){
      if(listaOps[i].hijos.length>0){
        this.generateOpcionesSistema(listaOps[i].hijos, urlIni+listaOps[i].url );
      }
      else{
        listaOps[i].url = urlIni+listaOps[i].url;
      }
    }
  }

  ngOnDestroy(): void {
    this.seleccionarOpcion.unsubscribe();
  }

}
