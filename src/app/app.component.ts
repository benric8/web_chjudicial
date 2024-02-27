import { Component,OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LoginService } from './pages/autenticacion/core/services/login.service';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { AppHjState } from './pages/NgRx/hj.reducers';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  public showOverlay = true;
  title = 'certel-web';
  constructor(private primengConfig: PrimeNGConfig,
    private loginService: LoginService, 
    private translateService: TranslateService, 
    private store: Store<AppHjState>,
    private router: Router){
      router.events.subscribe((event: RouterEvent) => {
        this.navigationInterceptor(event)
      })
  }
  ngOnInit() {
    this.primengConfig.ripple = true;
    console.log("mostrando mensaje")
    
    this.store.select('mostrarCargando').subscribe(({estado}) => {
      if(estado){
        this.mostrarCargando();
      } 
      else{
        this.ocultarCargando();
      }
  });   

    this.translateService.setDefaultLang('es');
    this.translateService.use("es");
    this.translateService.get('primeng').subscribe(res => this.primengConfig.setTranslation(res));
  }
  mostrarCargando() {    
    document.getElementById("cargando")?.classList.add('show-loading');
  }

  ocultarCargando() {
    document.getElementById("cargando")?.classList.remove('show-loading');
  }
  // navigator interceptor
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.showOverlay = true;
      console.log("evento router: " + event.url);
      this.loginService.verificarPermisos(event.url);
      this.mostrarCargando();
    }
    if (event instanceof NavigationEnd) {
      this.showOverlay = false;
      this.ocultarCargando();
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.showOverlay = false;
      this.ocultarCargando();
    }
    if (event instanceof NavigationError) {
      this.showOverlay = false;
      this.ocultarCargando();
    }
  }
}
