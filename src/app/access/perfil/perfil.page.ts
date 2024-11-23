import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController, AnimationController, ModalController } from '@ionic/angular';
import { AuthenticatorService } from './../../Servicios/authenticator.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit, AfterViewInit {
  username: string = '';  
  ubicacionActual = '';
  destino = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private animationController: AnimationController,
    private auth: AuthenticatorService,
    private modalController: ModalController,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.obtenerUsuario();  
  }

  ngAfterViewInit() {
    console.log('Gengar cargado');
  }

  async obtenerUsuario() {
    const username = await this.auth.obtenerUsuario();
    this.username = username;  
    console.log('Usuario cargado:', this.username);
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async mostrarToast() {
    const toast = await this.toastController.create({
      message: `Buscando viajes disponibles`,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  buscarViajes() {
    if (this.destino.length === 0) {
      this.mostrarAlerta('Por favor, ingrese su destino');
    } else {
      this.mostrarToast();
      this.animarLogo();
      setTimeout(() => {
        this.router.navigate(['/viajes']);
      }, 2000);
    }
  }

  async animarLogo() {
  const element = document.querySelector('ion-img.logo') as HTMLIonImgElement;
  if (!element) {
    console.error('No se encontró el maldito gengar');
    return;
  }

  console.log('Gengar Gotcha!:', element);

  element.classList.add('animate'); // Añade la clase para iniciar la animación

  setTimeout(() => {
    element.classList.remove('animate'); // Remueve la clase después de la animación
  }, 1500); // Ajusta el tiempo según la duración de la animación
}


  logout() {
    this.auth.logout(); 
    this.router.navigate(['/home']); 
  }

  async pass() {
    const alert = await this.alertController.create({
      header: 'Admin password',
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Contraseña'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado');
          }
        }, {
          text: 'Aceptar',
          handler: (data) => {
            if (data.password === '1234') {
              this.router.navigate(['/controller']);
            } else {
              this.presentToast('Contraseña incorrecta');
            }
          }
        }
      ]
    });
    
    await alert.present(); 
    const { data: { values: { password } } } = await alert.onDidDismiss(); 
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  openMenu() {
    const menu = document.querySelector('ion-menu');
    if (menu) {
      menu.open(); 
      console.log('Menú abierto');
    } else {
      console.error('No se encontró el menú');
    }
  }

  conductor() {
    this.router.navigate(['/conductor']);
  }
}
