import { TestBed } from '@angular/core/testing';

import { ConsultarHistorialJudicialService } from './consultar-historial-judicial.service';

describe('ConsultarHistorialJudicialService', () => {
  let service: ConsultarHistorialJudicialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultarHistorialJudicialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
