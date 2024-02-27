import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from "rxjs";
import {LoginRequest} from '../models/LoginRequest.model'
import { MenuOpcion, Usuario } from '../models/LoginResponse.model';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public readonly USUARIO = "USR_CHJ";
  constructor(private httpClient: HttpClient,private route: Router) { }

  login(user: LoginRequest) {
    return this.httpClient.post(`${ environment.urlApi }login`, user).pipe(
        map((result: any) => result),
        catchError(this.handleError)
    );
  }

  handleError(err: HttpErrorResponse): Observable<never> {
    console.log("Error services ",err);
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = err.error.message;
    } else {
      if(err.status === 401 || err.status === 403){
        errorMessage = 'Error en autenticación, intente ingresar al sistema nuevamente';
      }else{
        errorMessage = `Error: ${err.status}\n Mensaje: ${err.message}`;
      }
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
    //return throwError(() => err);
  }

  setUsuario(usuario: any) {
    localStorage.setItem(this.USUARIO, JSON.stringify(usuario))
  }

  getUsuario() {
    let usuarioLocal:string|null =localStorage.getItem(this.USUARIO); 
    if(usuarioLocal) {
        return JSON.parse(usuarioLocal);
    } else {
        return null;
    }
  }

  removeUsuario() {
    localStorage.removeItem(this.USUARIO);
  }

  clear(){
    localStorage.clear(); 
  }

  verificarPermisos(url:string){
    if(url !== '/autenticacion/login'){
      let dataUsuario:Usuario = this.getUsuario();
      if(!dataUsuario ){
        Swal.fire('Atención!', 'Acceso denegado', 'info');
        this.route.navigate(['/autenticacion/login']);
      }
      if(!this.existeOpcion(url,dataUsuario.opcions)){
        Swal.fire('Atención!', 'Acceso denegado a la opcion', 'info');
        this.route.navigate(['/autenticacion/login']);
      }
    }
  }
  
  existeOpcion(url:string, opciones:MenuOpcion[]):boolean{
    let existe:boolean = false;    
    opciones.forEach(opcion=>{
      if(opcion.url == url){
        existe = true;
      }
    })
    return existe;
  }
}
