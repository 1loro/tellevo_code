import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';
import { Storage } from '@ionic/storage-angular'; // Importa el servicio de Storage
import { IonicStorageModule } from '@ionic/storage-angular'; // Importa el módulo de almacenamiento

describe('StorageService', () => {
  let service: StorageService;
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
      imports: [IonicStorageModule.forRoot()], // Configura el módulo de almacenamiento
      providers: [
        StorageService,
        { provide: Storage, useValue: mockStorage }, // Proveedor mock para Storage
      ],
    }).compileComponents();

    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
