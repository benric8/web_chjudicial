import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../autenticacion/core/services/auth.service';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorCredencialesInterceptor implements HttpInterceptor {

  private refreshTokenInProgress = false;
  private refreshTokenSubject: Subject<any> = new BehaviorSubject<any>(null);
  constructor(private route: Router, public authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(catchError(err => {
          if ((err.status === 401 || err.status === 403) && !request.url.endsWith('api/authenticate') ) {
            if(request.url.includes('seguridad/refresh')){
              return throwError(()=>err);
            }
            else{
              let usuarioLocal:string|null =this.authService.getToken()
              return this.handle401Error(request, next, usuarioLocal);
            }
          }
          else{
            return throwError(()=>err);
          }
      }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler, token: any) {
    if (!this.refreshTokenInProgress) {
      this.refreshTokenInProgress = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken(token).pipe(
        switchMap((data: any) => {
          this.authService.setToken(data.token);
          //this.authService.setTokenAdmin(token.tokenAdmin);
          this.refreshTokenInProgress = false;
          this.refreshTokenSubject.next(data.token);//----------
          return next.handle(this.injectToken(request));
        }),
        catchError(err => {
          //this.refreshTokenInProgress = false;
          if(err.status === 401 || err.status === 403){
            this.logOutRefresh();
            console.log("error refresh",err);
          }
          this.refreshTokenInProgress = false;
          return throwError(()=>err);
        }));

    } 
    else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.injectToken(request));
        }));
    }
  }

  injectToken(request: HttpRequest<any>) {
    //console.log("inyectamdo");
    const token = this.authService.getToken();
    // const tokenAdmin = this.authService.getTokenAdmin();
    return request.clone({
        setHeaders: {
            'Content-Type':  'application/json',
            Authorization: `Bearer ${ token }`
        }
    });
  }

  logOutRefresh():void{
    //Swal.fire('Atención!', 'Error en autenticación, intente ingresar al sistema nuevamente', 'error');
    this.route.navigate(['/autenticacion/login']);
  }

}