import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoEntidadesComponent } from './mantenimiento-entidades.component';

describe('MantenimientoEntidadesComponent', () => {
  let component: MantenimientoEntidadesComponent;
  let fixture: ComponentFixture<MantenimientoEntidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenimientoEntidadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoEntidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
