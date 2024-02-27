import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from '../../core/services/auth.service';
import { LoginService } from '../../core/services/login.service';

import { RecaptchaComponent, RecaptchaErrorParameters } from 'ng-recaptcha';
import { TokenModel } from '../../core/models/token.model';
import { LoginRequest } from '../../core/models/LoginRequest.model';
import { LoginResponse } from '../../core/models/LoginResponse.model';
import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import * as actions from 'src/app/pages/shared/store/actions';
import { AppHjState } from '../../../NgRx/hj.reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  tokenLoad:boolean = false;
  loginLoad:boolean = false;
  loginBlock:boolean = false;
  user: LoginRequest;
  //------------- captcha config ---
  capchaKey: string = environment.tokenCaptcha;
  recaptcha:any = (window as any).grecaptcha;
  capchaLoad: boolean=false;
  tokenCapcha:string | null=null;
  tokenCapchaLast:string | null=null;
  errorCapcha:boolean=false;
  //--
  @ViewChild('captchaElem', { static: false }) captchaElem: RecaptchaComponent | null = null;

  constructor(private primengConfig: PrimeNGConfig,
    private route: Router, 
    private activatedRoute: ActivatedRoute,
    private authService: AuthService, 
    private loginService: LoginService,
    private store: Store<AppHjState>) {
    this.user = new LoginRequest('','','','','N')
    this.authService.logoutSession();
    this.autenticate();
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

  }
  autenticate():void{
    this.tokenLoad = false;
    this.store.dispatch(actions.mostrarCargando({ estado: true}));
    this.authService.recuperarTokenAutorization().subscribe({
      next:(data:TokenModel)=>{
        console.log("data get autorization",data);
        this.authService.setToken(data.token);

      },
      complete:()=>{
        this.tokenLoad = true;
        this.store.dispatch(actions.mostrarCargando({ estado: false}));
      },
      error:(err)=>{
        this.tokenLoad = true;
        this.loginBlock = true
        this.store.dispatch(actions.mostrarCargando({ estado: false}));
        console.log("error autorization",err);
        Swal.fire('Atención!', "Error en la conexión con el servicio, recargue la página.", 'warning');
      }
    });
  }

  login():void {
    this.loginLoad = true;
    
    if(this.user.usuario){
      this.user.usuario = this.user.usuario.trim();
      //this.user.usuario = this.user.usuario.toUpperCase();
    }

    if(this.user.contrasenia){
      this.user.contrasenia = this.user.contrasenia.trim();
      //this.user.contrasenia = this.user.contrasenia.toUpperCase();
    }
    if(!this.tokenCapcha){
      Swal.fire('Atención!', 'Complete el CAPCHA para poder ingresar al sistema', 'warning');
      this.loginLoad = false;
      return;
    }
    this.store.dispatch(actions.mostrarCargando({ estado: true}));
    let tokenAut = this.authService.getToken();
    if(tokenAut){
      this.user.token = tokenAut;
      this.user.aplicaCaptcha='S';
      this.user.tokenCaptcha = this.tokenCapcha;
      if(this.user.usuario && this.user.usuario!="" && this.user.contrasenia && this.user.contrasenia!=""){
        this.loginService.login({...this.user}).subscribe({
          next:(data:LoginResponse)=>{
            console.log("login",data);
            if(data.codigo==="001"){
              this.loginService.setUsuario(data.data);
              this.authService.setToken(data.data.token);
              if(data.data.perfil==="CONSULTANTE"){
                this.route.navigate(['/consulta/buscar-historial']);
              }else{
                this.route.navigate(['/admin/usuarios']);
              }
            }
            else{
              this.loginLoad = false;
              this.store.dispatch(actions.mostrarCargando({ estado: false}));
              Swal.fire('Atención!', data.descripcion, 'info');
              this.captchaElem?.reset();
            }
          },
          complete:()=>{
            //this.loginLoad = false;
            //this.store.dispatch(actions.mostrarCargando({ estado: false}));
          },
          error:(err)=>{
            console.log("error login", err);
            Swal.fire('Atención!', err, 'warning');
            //
            this.captchaElem?.reset();
            this.loginLoad = false;
            this.store.dispatch(actions.mostrarCargando({ estado: false}));
            this.autenticate();
          }
        });
      }
      else{
        Swal.fire('Atención!', 'Complete usuario y contraseña, para ingresar al sistema.', 'warning');
        this.captchaElem?.reset();
        this.loginLoad = false;
        this.store.dispatch(actions.mostrarCargando({ estado: false}));
      }
    }
    else{
      Swal.fire('Atención!', 'Autorización requerida, inténtelo nuevamente.', 'warning');
      this.captchaElem?.reset();
      this.loginLoad = false;
      this.autenticate();
    }
    

    //this.route.navigate(['/consulta'], {relativeTo: this.activatedRoute});
  }
  showResponseCapcha(event:any){
    //console.log(event);
    this.tokenCapcha = event.response;
    this.tokenCapchaLast = event.response;
    this.errorCapcha=false;
  }
  showExpireCapcha(event:any){
    //console.log(event);
    this.capchaLoad=false;
    this.captchaElem?.reset();
  }
  public resolved(captchaResponse: string): void {
    this.tokenCapcha = captchaResponse;
    this.tokenCapchaLast = captchaResponse;
  }
  
  public onError(errorDetails: RecaptchaErrorParameters): void {
    console.log(`reCAPTCHA error encountered; details:`, errorDetails);
    Swal.fire('Problema con Captcha de Google',('reCAPTCHA error encountered; details:' + errorDetails), 'error' );
  }

  reloadLogin(){
    window.location.reload();
  }

}
