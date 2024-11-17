import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticatorService } from 'src/app/Servicios/authenticator.service'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user = {
    nombre: "",
    email: "",
    password: ""
  } 

  constructor(
    private alertController: AlertController, 
    private toastController: ToastController,
    private router: Router,
    private authService: AuthenticatorService 
  ) {}

  ngOnInit() {}

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000, 
      position: 'bottom', 
    });
    await toast.present();
  }

  async registrar() {
    // Validación básica de campos
    if (!this.user.nombre || !this.user.email || !this.user.password) {
      this.mostrarAlerta('Por favor, complete todos los campos');
      return;
    }

    console.log(this.user);

    try {
      // Llamamos al servicio de autenticación para registrar al usuario
      const registroExitoso = await this.authService.register(this.user.nombre, this.user.email, this.user.password);

      if (registroExitoso) {
        // Si el registro fue exitoso, mostramos un toast y redirigimos al home
        this.mostrarToast('Registro exitoso');
        this.router.navigate(['/home']);
      } else {
        // Si algo falló en el registro
        this.mostrarAlerta('Error en el registro, intenta de nuevo');
      }
    } catch (error) {
      // Manejo de errores en caso de problemas con Firebase o la red
      console.error('Error en el registro:', error);
      this.mostrarAlerta('Hubo un problema al registrar al usuario. Intenta más tarde.');
    }
  }
}
