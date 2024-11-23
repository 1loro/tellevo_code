import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatorService } from '../Servicios/authenticator.service';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { DataService } from '../Servicios/data.services';
import { ViajeService } from '../Servicios/viaje.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google: any;

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.page.html',
  styleUrls: ['./conductor.page.scss'],
})
export class ConductorPage implements OnInit {
  comunaOrigen: string = ''; 
  comunaDestino: string = ''; 
  valorKilometro: number = 0; 
  Detalles: string = ''; 
  map: any;
  autocompleteOrigen: any;
  autocompleteDestino: any;
  currentLocationMarker: any;

  @ViewChild('origenInput', { static: false }) origenInput: any;
  @ViewChild('destinoInput', { static: false }) destinoInput: any;

  constructor(
    private auth: AuthenticatorService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private dataService: DataService,
    private viajeService: ViajeService,
    private geolocation: Geolocation
  ) {}

  ngOnInit() {
    this.loadGoogleMaps();
  }

  loadGoogleMaps() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDQ8Igfsv_r5J8xKXacVIUc3Xwcup8U-ws&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => this.initAutocomplete();
    document.body.appendChild(script);
  }

  async initAutocomplete() {
    const origenInputElement = await this.origenInput.getInputElement();
    const destinoInputElement = await this.destinoInput.getInputElement();

    this.autocompleteOrigen = new google.maps.places.Autocomplete(origenInputElement);
    this.autocompleteDestino = new google.maps.places.Autocomplete(destinoInputElement);

    this.autocompleteOrigen.addListener('place_changed', () => {
      const place = this.autocompleteOrigen.getPlace();
      if (place.geometry) {
        this.comunaOrigen = place.formatted_address;
      }
    });

    this.autocompleteDestino.addListener('place_changed', () => {
      const place = this.autocompleteDestino.getPlace();
      if (place.geometry) {
        this.comunaDestino = place.formatted_address;
      }
    });
  }

  async guardarDatos() {
    if (!this.comunaOrigen || !this.comunaDestino || this.valorKilometro <= 0) {
      this.presentToast('Complete los campos de Comuna');
      return;
    }

    const datos = {
      comunaOrigen: this.comunaOrigen,
      comunaDestino: this.comunaDestino,
      valorKilometro: this.valorKilometro,
      detalles: this.Detalles,
      Text: 'Viaje disponible',
    };

    await this.viajeService.guardarViaje(datos);
    await this.presentToast('Viaje creado correctamente');
    setTimeout(() => {
      this.router.navigate(['/viajes']);  // Navega a la página de viajes
    }, 1000);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  logout() {
    this.auth.logout(); 
    this.router.navigate(['/home']); 
  }
}
