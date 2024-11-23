import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Importar HttpClientTestingModule

import { APIControllerService } from './apicontroller.service';

describe('APIControllerService', () => {
  let service: APIControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Agregar HttpClientTestingModule aquí
    });
    service = TestBed.inject(APIControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
