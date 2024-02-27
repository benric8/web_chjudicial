import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaHistorialDetalleComponent } from './busqueda-historial-detalle.component';

describe('BusquedaHistorialDetalleComponent', () => {
  let component: BusquedaHistorialDetalleComponent;
  let fixture: ComponentFixture<BusquedaHistorialDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaHistorialDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaHistorialDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
