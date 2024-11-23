import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContrasenaPage } from './contrasena.page';
import { AngularFireModule } from '@angular/fire/compat'; // Importa AngularFireModule
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // Importa AngularFireAuthModule
import { environment } from 'src/environments/environment'; // Asegúrate de tener la configuración de Firebase en environment.ts

describe('ContrasenaPage', () => {
  let component: ContrasenaPage;
  let fixture: ComponentFixture<ContrasenaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContrasenaPage],
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),  // Inicializa Firebase con tu configuración
        AngularFireAuthModule,  // Proporciona el módulo de autenticación
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
