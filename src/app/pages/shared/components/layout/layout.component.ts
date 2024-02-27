import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppHjState } from 'src/app/pages/NgRx/hj.reducers';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  sidebarShow:boolean=false;
  display:boolean = false;
  
  perfil:string ='1';
  constructor(private primengConfig: PrimeNGConfig,
    private route: Router, 
    private activatedRoute: ActivatedRoute, 
    private store: Store<AppHjState>) { 
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

  }
  ngOnDestroy(): void {
    
  }
}
