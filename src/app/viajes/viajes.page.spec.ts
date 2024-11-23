import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; // Importa el módulo de HttpClient
import { ViajesPage } from './viajes.page';
import { ViajeService } from '../Servicios/viaje.service'; // Servicio de viajes
import { IonicStorageModule } from '@ionic/storage-angular'; // Módulo de almacenamiento
import { Storage } from '@ionic/storage-angular';

describe('ViajesPage', () => {
  let component: ViajesPage;
  let fixture: ComponentFixture<ViajesPage>;

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
      declarations: [ViajesPage],
      imports: [
        HttpClientModule, // Importa HttpClientModule para que HttpClient esté disponible
        IonicStorageModule.forRoot(), // Configura el módulo de almacenamiento
      ],
      providers: [
        ViajeService, // Proveedor para ViajeService
        { provide: Storage, useValue: mockStorage }, // Proveedor mock para Storage
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
