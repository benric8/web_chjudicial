import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

import {  faUser , faUserTie, faUserShield ,faUserCog } from '@fortawesome/free-solid-svg-icons';
import { Usuario } from 'src/app/pages/autenticacion/core/models/LoginResponse.model';
import { LoginService } from 'src/app/pages/autenticacion/core/services/login.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() profile:boolean = false;

  itemsEnd: MenuItem[]=[];

  usuario: Usuario;
  title:string ="";
  constructor(private route: Router, private loginService: LoginService,) { 
    this.usuario = this.loginService.getUsuario();
  }
  //----
  faUser = faUser;
  faUserTie = faUserTie;
  faUserShield = faUserShield;
  faUserCog = faUserCog;
  
  ngOnInit(): void {
    this.itemsEnd = [
      {
          label:'Canbiar contraseña',
          icon:'pi pi-lock',
          styleClass:"menu-profile-item p-ripple",
          routerLink: ['/usuario/cambiar-contrasenia'],
          routerLinkActiveOptions: { exact: true },
      },
      {
        separator:true
      },
      {
          label:'Salir',
          icon:'pi pi-sign-out',
          command:(event: any) => {
              this.salir();
          },
          styleClass:"menu-profile-item p-ripple",
          
      }            
    ];

    
  }

  salir():void{
    //this.loginService.removeUsuario();
    this.route.navigate(['/autenticacion/login']);
  }
}
