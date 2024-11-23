import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { EsperandoPage } from './esperando.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';

describe('EsperandoPage', () => {
  let component: EsperandoPage;
  let fixture: ComponentFixture<EsperandoPage>;

  // Mock de Geolocation
  const mockGeolocation = {
    getCurrentPosition: jasmine.createSpy('getCurrentPosition').and.returnValue(
      Promise.resolve({
        coords: {
          latitude: 0,
          longitude: 0,
        },
      })
    ),
    watchPosition: jasmine.createSpy('watchPosition').and.returnValue({
      subscribe: () => {},
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EsperandoPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: Geolocation, useValue: mockGeolocation },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EsperandoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
