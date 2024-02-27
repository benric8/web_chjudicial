import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaHistorialJudicialComponent } from './busqueda-historial-judicial.component';

describe('BusquedaHistorialJudicialComponent', () => {
  let component: BusquedaHistorialJudicialComponent;
  let fixture: ComponentFixture<BusquedaHistorialJudicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaHistorialJudicialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaHistorialJudicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
