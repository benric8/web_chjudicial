import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from "rxjs";
import { CambioContraseniaRequest } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient: HttpClient) { }
  cambiarContrasenia(payload:CambioContraseniaRequest){
    return this.httpClient.post(`${ environment.urlApi }cambiarClave`, payload).pipe(
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
}
