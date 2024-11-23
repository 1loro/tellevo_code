import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControllerPage } from './controller.page';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


const firebaseConfigMock = {
  apiKey: 'mock-api-key',
  authDomain: 'mock-auth-domain',
  projectId: 'mock-project-id',
  storageBucket: 'mock-storage-bucket',
  messagingSenderId: 'mock-sender-id',
  appId: 'mock-app-id',
};

const mockAngularFireAuth = {
  authState: jasmine.createSpy('authState').and.returnValue(Promise.resolve(null)),
  signInWithEmailAndPassword: jasmine
    .createSpy('signInWithEmailAndPassword')
    .and.returnValue(Promise.resolve()),
  signOut: jasmine.createSpy('signOut').and.returnValue(Promise.resolve()),
};

describe('ControllerPage', () => {
  let component: ControllerPage;
  let fixture: ComponentFixture<ControllerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControllerPage],
      providers: [
        { provide: AngularFireAuth, useValue: mockAngularFireAuth }, 
      ],
      imports: [
        AngularFireModule.initializeApp(firebaseConfigMock),
        AngularFireAuthModule,  
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ControllerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
