import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConductorPage } from './conductor.page';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ViajeService } from '../Servicios/viaje.service';
import { Storage } from '@ionic/storage-angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';  // Importar AngularFireAuth
import { environment } from '../../environments/environment';  // Asegúrate de que tu entorno de Firebase esté configurado

describe('ConductorPage', () => {
  let component: ConductorPage;
  let fixture: ComponentFixture<ConductorPage>;

  // Mock del servicio Storage
  let mockStorage: Partial<Storage>;

  beforeEach(async () => {
    // Crea un mock del servicio Storage
    mockStorage = {
      create: jasmine.createSpy('create').and.returnValue(Promise.resolve()),
      get: jasmine.createSpy('get').and.returnValue(Promise.resolve(null)),
      set: jasmine.createSpy('set').and.returnValue(Promise.resolve()),
      remove: jasmine.createSpy('remove').and.returnValue(Promise.resolve()),
    };

    await TestBed.configureTestingModule({
      declarations: [ConductorPage],
      imports: [
        IonicStorageModule.forRoot(),  // Configura el almacenamiento
        AngularFireModule.initializeApp(environment.firebaseConfig),  // Inicializa Firebase
      ],
      providers: [
        ViajeService,
        { provide: Storage, useValue: mockStorage },  // Mockea el servicio Storage
        AngularFireAuth,  // Agrega el servicio AngularFireAuth
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
