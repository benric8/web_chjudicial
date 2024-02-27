import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AyudaRoutingModule } from './routers/ayuda-routing.module';

import {RippleModule} from 'primeng/ripple';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AyudaRoutingModule,
    RippleModule
  ]
})
export class AyudaModule { }
