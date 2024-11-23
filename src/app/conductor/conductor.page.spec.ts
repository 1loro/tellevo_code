import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConductorPage } from './conductor.page';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ViajeService } from '../Servicios/viaje.service';
import { Storage } from '@ionic/storage-angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { environment } from '../../environments/environment';  
import { Geolocation } from '@ionic-native/geolocation/ngx';  

describe('ConductorPage', () => {
  let component: ConductorPage;
  let fixture: ComponentFixture<ConductorPage>;


  let mockStorage: Partial<Storage>;


  let mockGeolocation: Partial<Geolocation>;

  beforeEach(async () => {
    
    mockStorage = {
      create: jasmine.createSpy('create').and.returnValue(Promise.resolve()),
      get: jasmine.createSpy('get').and.returnValue(Promise.resolve(null)),
      set: jasmine.createSpy('set').and.returnValue(Promise.resolve()),
      remove: jasmine.createSpy('remove').and.returnValue(Promise.resolve()),
    };

    
    mockGeolocation = {
      getCurrentPosition: jasmine.createSpy('getCurrentPosition').and.returnValue(Promise.resolve({ coords: { latitude: 10, longitude: 10 } })),
      watchPosition: jasmine.createSpy('watchPosition').and.returnValue(Promise.resolve({ coords: { latitude: 10, longitude: 10 } })),
    };

    await TestBed.configureTestingModule({
      declarations: [ConductorPage],
      imports: [
        IonicStorageModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),  
      ],
      providers: [
        ViajeService,
        { provide: Storage, useValue: mockStorage }, 
        { provide: Geolocation, useValue: mockGeolocation },  
        AngularFireAuth,  
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
