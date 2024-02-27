import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from "rxjs";
import { Entidad, Usuario, ValidarDocumentoModel, ValidarRUCModel } from '../models/Maestras.model';
import { FiltroEntidadModel } from '../models/Maestras.model';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
  })
  export class MantenimientoService {

    constructor(private httpClient: HttpClient) {}

/*     consultarEntidades(payload:FiltroEntidadModel){
      return this.httpClient.get(`${ environment.urlApi }maestras/entidades`, payload).pipe(
        map((result: any) => result),
        catchError(this.handleError)
      );
    } */

    getUsuarios(usuario : string){
      return this.httpClient.get(`${ environment.urlApi }maestras/usuarios?idUsuario=&usuario=${usuario}`).pipe(
        map((result: any) => result),
        catchError(this.handleError)
      );
    }

    postCrearUsuario(usuario:Usuario){
      return this.httpClient.post(`${ environment.urlApi }maestras/crear/usuario`, usuario).pipe(
        map((result: any) => result),
        catchError(this.handleError)
      );
    }

    putActualizarUsuario(usuario:Usuario){
      return this.httpClient.put(`${ environment.urlApi }maestras/actualizar/usuario/${usuario.id}`, usuario).pipe(
        map((result: any) => result),
        catchError(this.handleError)
      );    
    }    

    getEntidades(entidad : string){
      return this.httpClient.get(`${ environment.urlApi }maestras/entidades?idEntidad=&entidad=${entidad}`).pipe(
        map((result: any) => result),
        catchError(this.handleError)
      );
    }

    getEntidadesActivas(){
      return this.httpClient.get(`${ environment.urlApi }maestras/entidades?idEntidad=&entidad=&activo=1`).pipe(
        map((result: any) => result),
        catchError(this.handleError)
      );
    }

    postCrearEntidades(entidad:Entidad){
      return this.httpClient.post(`${ environment.urlApi }maestras/crear/entidad`, entidad).pipe(
        map((result: any) => result),
        catchError(this.handleError)
      );
    }
    
    putActualizarEntidad(entidad:Entidad){
        return this.httpClient.put(`${ environment.urlApi }maestras/actualizar/entidad/${entidad.id}`, entidad).pipe(
          map((result: any) => result),
          catchError(this.handleError)
        );    
    }

    getPerfiles(){
      return this.httpClient.get(`${ environment.urlApi }maestras/perfiles`).pipe(
        map((result: any) => result),
        catchError(this.handleError)
      );
    }

    validarDocumentoIdentidad(doc: ValidarDocumentoModel){
      return this.httpClient.post(`${ environment.urlApi }consultaReniec`,doc).pipe(
          map((result: any) => result),
          catchError(err => {
              Swal.fire('Atención!', 'Error al validar documento identidad', 'warning');
              return throwError(err);
          })
      );
  }    

  validarRUC(ruc: ValidarRUCModel){
    return this.httpClient.post(`${ environment.urlApi }consultaSunat`,ruc).pipe(
        map((result: any) => result),
        catchError(err => {
            Swal.fire('Atención!', 'Error al validar RUC', 'warning');
            return throwError(err);
        })
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
  }