import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage-angular'; // Importa el módulo de almacenamiento
import { Storage } from '@ionic/storage-angular';

describe('AppComponent', () => {
  let mockStorage: Partial<Storage>;

  beforeEach(async () => {
    // Mock para Storage
    mockStorage = {
      create: jasmine.createSpy('create').and.returnValue(Promise.resolve()),
      get: jasmine.createSpy('get').and.returnValue(Promise.resolve(null)),
      set: jasmine.createSpy('set').and.returnValue(Promise.resolve()),
      remove: jasmine.createSpy('remove').and.returnValue(Promise.resolve()),
    };

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [IonicStorageModule.forRoot()], // Configura el módulo de almacenamiento
      providers: [
        { provide: Storage, useValue: mockStorage }, // Proveedor mock para Storage
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Para ignorar elementos personalizados
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
