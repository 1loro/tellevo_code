import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Asegúrate de importar Firebase Authentication

@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.page.html',
  styleUrls: ['./contrasena.page.scss'],
})
export class ContrasenaPage implements OnInit {
  correo = ''; // Correo del usuario

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private afAuth: AngularFireAuth // Inyectamos el servicio de Firebase Authentication
  ) {}

  ngOnInit() {}

  // Mostrar el toast para confirmar que el enlace fue enviado
  async mostrarToast() {
    const toast = await this.toastController.create({
      message: 'Enlace de recuperación enviado correctamente',
      duration: 5000,
      position: 'bottom',
    });
    await toast.present();
  }

  // Mostrar una alerta con un mensaje
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Método para enviar el enlace de restablecimiento de contraseña
  async enviarEnlace() {
    if (this.correo.trim() === '') {
      this.mostrarAlerta('Por favor, ingrese su correo electrónico');
    } else if (!this.validarCorreo(this.correo)) {
      this.mostrarAlerta('Por favor, ingrese un correo electrónico válido');
    } else {
      try {
        // Enviar el enlace de restablecimiento de contraseña a Firebase
        await this.afAuth.sendPasswordResetEmail(this.correo);

        // Si el enlace se envía correctamente, mostrar el toast
        this.mostrarToast();
      } catch (error) {
        console.error('Error al enviar el enlace de recuperación:', error);
        this.mostrarAlerta('Hubo un error al enviar el enlace. Por favor, intente nuevamente.');
      }
    }
  }

  // Validar formato de correo electrónico
  validarCorreo(correo: string): boolean {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // Expresión regular para validar el correo
    return regex.test(correo);
  }
}
