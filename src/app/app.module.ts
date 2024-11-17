import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx'; // Importa Geolocation

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Animaciones
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IonicStorageModule } from '@ionic/storage-angular';

// Firebase imports
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';  // Importa el módulo de Firestore
import { environment } from '../environments/environment'; // Archivo de configuración

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule, // Animaciones habilitadas
    MatProgressSpinnerModule,
    IonicStorageModule.forRoot(),
    FormsModule,
    HttpClientModule,

    // Inicializar Firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireAnalyticsModule,
    AngularFirestoreModule,  // Importa Firestore aquí
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation, // Registrado como proveedor
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
