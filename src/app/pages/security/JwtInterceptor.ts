import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../autenticacion/core/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

    constructor(public authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.authService.getToken();
        if (token != undefined && token != null) {//----
            if(req.url != `${ environment.urlApi }api/authenticate`){
                req = req.clone({
                    setHeaders: {
                        'Content-Type':  'application/json',
                         Authorization: `Bearer ${ token }`
                    }
                });
            }
        } 
        else {
            console.log("No hay Token");
        }
        return next.handle(req);
    }
  }