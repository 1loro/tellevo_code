import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; 
import { AuthenticatorService } from './../Servicios/authenticator.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user = {
    username: '',
    password: '',
  };
  mensaje = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private auth: AuthenticatorService
  ) {}

  async mostrarAlerta(mensaje: string, header: string = 'Error') {
    const alert = await this.alertController.create({
      header,
      message: mensaje,
      buttons: ['OK'],
      cssClass: 'custom-alert'
    });
    await alert.present();
  }

  async validar() {
    if (!this.user.username) {
      this.mensaje = 'Usuario vacío';
      this.mostrarAlerta('Por favor, ingrese su usuario', 'Campos incompletos');
      return;
    }

    if (!this.user.password) {
      this.mensaje = 'Contraseña vacía';
      this.mostrarAlerta('Por favor, ingrese su contraseña', 'Campos incompletos');
      return;
    }

    try {
      const isLoggedIn = await this.auth.login(this.user.username, this.user.password);
      if (isLoggedIn) {
        this.mensaje = '';
        const navigationExtras: NavigationExtras = {
          state: {
            username: this.user.username,
          },
        };
        this.router.navigate(['/perfil'], navigationExtras);
      } else {
        this.mostrarAlerta('Credenciales erróneas', 'Error de autenticación');
      }
    } catch (error) {
      this.mostrarAlerta('Error en el servidor. Inténtelo más tarde.', 'Error del servidor');
      console.error('Error en el login:', error);
    }
  }
}
