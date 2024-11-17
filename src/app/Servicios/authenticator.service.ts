import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {
  private connnectionStatus = false;

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  // Inicio de sesión con Firebase
  async login(user: string, pass: string): Promise<boolean> {
    try {
      const response = await this.afAuth.signInWithEmailAndPassword(user, pass);

      if (response.user) {
        console.log("Usuario autenticado");
        this.router.navigate(['/perfil']);
        this.connnectionStatus = true;
        return true;
      } else {
        console.log("Error en las credenciales: respuesta de Firebase", response);
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
    }

    this.connnectionStatus = false;
    return false;
  }

  // Registro de usuario con Firebase
  async register(nombre: string, email: string, password: string): Promise<boolean> {
    if (!nombre || !email || !password) {
      console.error("Todos los campos son requeridos");
      return false;
    }

    try {
      const response = await this.afAuth.createUserWithEmailAndPassword(email, password);

      if (response.user) {
        console.log("Usuario registrado con éxito");
        return true;
      }
    } catch (error) {  
      console.error("Error en el registro:", error);
    }

    return false;
  }

  // Cierre de sesión con Firebase
  async logout() {
    try {
      await this.afAuth.signOut();
      this.connnectionStatus = false;
      console.log("Sesión cerrada con éxito");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  }

  // Verificar si el usuario está conectado
  isConected() {
    return this.connnectionStatus;
  }

  // Obtener email del usuario autenticado y recortar para mostrar solo hasta el @
  async obtenerUsuario(): Promise<string> {
    const user = await this.afAuth.currentUser;
    if (user && user.email) {
      const email = user.email;
      return email.split('@')[0];  // Retorna solo la parte antes del '@'
    }
    return ''; // Si no está autenticado, devuelve un string vacío
  }
}
