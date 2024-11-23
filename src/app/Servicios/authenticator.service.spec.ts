import { TestBed } from '@angular/core/testing';
import { AuthenticatorService } from './authenticator.service';
import { AngularFireModule } from '@angular/fire/compat';  // Importa AngularFireModule
import { AngularFireAuthModule } from '@angular/fire/compat/auth';  // Importa AngularFireAuthModule
import { environment } from 'src/environments/environment';  // Asegúrate de que environment tenga la configuración correcta

describe('AuthenticatorService', () => {
  let service: AuthenticatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),  // Inicializa Firebase con la configuración
        AngularFireAuthModule  // Asegúrate de importar AngularFireAuthModule
      ],
      providers: [AuthenticatorService],  // Asegúrate de que el servicio esté disponible
    });
    service = TestBed.inject(AuthenticatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
