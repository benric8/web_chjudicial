import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SidebarModule} from 'primeng/sidebar';
//import {DataViewModule} from 'primeng/dataview';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {MenuModule} from 'primeng/menu';
import {ButtonModule} from 'primeng/button';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LayoutComponent } from './components/layout/layout.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { MenuComponent } from './components/layout/menu/menu.component';
import { MenuOpcionComponent } from './components/layout/menu-opcion/menu-opcion.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
//import { StepperComponent } from './components/stepper/stepper.component';
//import { PageHeaderComponent } from './components/page-header/page-header.component';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [
    LayoutComponent,
    FooterComponent,
    MenuComponent,
    MenuOpcionComponent,
    NavbarComponent,
    //StepperComponent,
    //PageHeaderComponent
  ],
  imports: [
    CommonModule,
    SidebarModule,
    OverlayPanelModule,
    MenuModule,
    ButtonModule,
    FontAwesomeModule,
    RippleModule
  ],
  exports:[
    NavbarComponent,
    MenuComponent,
    MenuOpcionComponent,
    FooterComponent,
    LayoutComponent,
    //StepperComponent,
    //PageHeaderComponent
  ]
})
export class SharedModule { }
