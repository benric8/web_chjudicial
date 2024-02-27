import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly JWT_TOKEN = 'HJ_TOKEN';
  constructor(private httpClient: HttpClient) { }

  recuperarTokenAutorization () {
    return  this.httpClient.post(`${ environment.urlApi }api/authenticate`,  null, {
      headers: new HttpHeaders({'username': environment.usuarioConsumo , 'password': environment.claveUsuarioConsumo, 'codigoCliente':  environment.codigoCliente, 'codigoRol': environment.codigoRol}),
      responseType: "json"
      }).pipe(
      map((result:any) => result),
      catchError(this.handleError)
    );
  }

  refreshToken (token: any) {
    return this.httpClient.get(`${ environment.urlApi }seguridad/refresh?token=${token}`).pipe(
        map((result:any) => result),
        catchError(err => {
            //Swal.fire('Atención!', 'Sesión finalizada, ingrese nuevamente.', 'info');
            return throwError(() => err);
          })
    );
  }

  handleError(err: HttpErrorResponse): Observable<never> {
    console.log("Error services ",err);
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = err.error.message;
    } else {
      errorMessage = `Error codigo:${err.status} \n Mensaje: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
    //return throwError(() => err);
  }

  setToken(token: string) {
    localStorage.setItem(this.JWT_TOKEN, token);
  }
  
  getToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  removeToken() {
    localStorage.removeItem(this.JWT_TOKEN);
  }

  logoutSession() {
    localStorage.clear();
  }

}
