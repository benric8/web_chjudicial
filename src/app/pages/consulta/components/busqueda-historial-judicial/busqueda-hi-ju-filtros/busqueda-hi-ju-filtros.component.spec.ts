import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaHiJuFiltrosComponent } from './busqueda-hi-ju-filtros.component';

describe('BusquedaHiJuFiltrosComponent', () => {
  let component: BusquedaHiJuFiltrosComponent;
  let fixture: ComponentFixture<BusquedaHiJuFiltrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaHiJuFiltrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaHiJuFiltrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
