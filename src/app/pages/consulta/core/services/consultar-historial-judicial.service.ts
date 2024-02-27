import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from "rxjs";
import { FiltroHistorialModel } from '../models/ConsultaCondenas.model';
import { ConsultaReniecReqModel } from '../models/ConsultaReniec.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultarHistorialJudicialService {

  constructor(private httpClient: HttpClient) {}

  consultarCondenas(payload:FiltroHistorialModel){
    return this.httpClient.post(`${ environment.urlApi }consultaCondenas`, payload).pipe(
      map((result: any) => result),
      catchError(this.handleError)
    );
  }

  consultarPrisionPreventiva(payload:FiltroHistorialModel){
    return this.httpClient.post(`${ environment.urlApi }consultaPrisionPreventiva`, payload).pipe(
      map((result: any) => result),
      catchError(this.handleError)
    );
  }

  consultarReniec(payload:ConsultaReniecReqModel){
    return this.httpClient.post(`${ environment.urlApi }consultaReniec`, payload).pipe(
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
