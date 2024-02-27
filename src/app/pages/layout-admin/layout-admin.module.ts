import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {SidebarModule} from 'primeng/sidebar';

import { LayoutAdminRoutingModule } from './routers/layout-admin-routing.module';

import { LayoutAdminComponent } from './components/layout-admin/layout-admin.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LayoutAdminComponent
  ],
  imports: [
    CommonModule,
    LayoutAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SidebarModule    
  ]
})
export class LayoutAdminModule { }
