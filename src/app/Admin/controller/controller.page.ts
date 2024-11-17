import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';  // Asegúrate de usar compat/auth
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Asegúrate de usar compat/firestore

@Component({
  selector: 'app-controller',
  templateUrl: './controller.page.html',
  styleUrls: ['./controller.page.scss'],
})
export class ControllerPage implements OnInit {
  users: any[] = [];

  constructor(
    private afAuth: AngularFireAuth, 
    private firestore: AngularFirestore,  // Para acceder a la base de datos
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  // Cargar los usuarios desde Firestore
  cargarUsuarios() {
    this.firestore.collection('usuarios').snapshotChanges().subscribe((data: any[]) => {
      this.users = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        };
      });
    }, (error: any) => {
      console.error('Error al cargar usuarios', error);
    });
  }

  // Modificar un usuario
  async modificarUsuario(id: string) {
    const usuario = this.users.find(user => user.id === id);
    if (!usuario) {
      await this.mostrarToast("Usuario no encontrado.");
      return; 
    }

    const modal = await this.alertController.create({
      header: 'Editar Usuario',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre',
          value: usuario.nombre
        },
        {
          name: 'password',
          type: 'text',
          placeholder: 'Contraseña',
          value: usuario.password
        },
        {
          name: 'email',
          type: 'text',
          placeholder: 'Correo',
          value: usuario.email
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Edición cancelada.');
          }
        },
        {
          text: 'Guardar',
          handler: async (data) => {
            if (data.nombre && data.password && data.email) {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(data.email)) {
                await this.mostrarToast("Por favor ingrese un correo válido.");
                return;
              }

              // Verificar si el nombre o correo ya están en uso
              const userRef = this.firestore.collection('usuarios', ref => ref.where('email', '==', data.email));
              userRef.get().subscribe(async snapshot => {
                if (!snapshot.empty && snapshot.docs[0].id !== id) {
                  await this.mostrarToast("El correo ya está en uso.");
                  return;
                }

                await this.firestore.collection('usuarios').doc(id).update({
                  nombre: data.nombre,
                  password: data.password,
                  email: data.email
                });

                await this.mostrarToast("Usuario editado con éxito");
              });
            } else {
              console.log("No se editó el usuario, faltan datos.");
              await this.mostrarToast("Usuario no editado, faltan datos");
            }
          }
        }
      ]
    });

    await modal.present(); 
  }

  // Eliminar un usuario
  async eliminarUsuario(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas eliminar este usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Eliminación cancelada.');
          }
        },
        {
          text: 'Eliminar',
          handler: async () => {
            this.firestore.collection('usuarios').doc(id).delete().then(() => {
              this.users = this.users.filter(user => user.id !== id); 
              console.log("Usuario eliminado con id:", id);
              this.mostrarToast("Usuario eliminado con éxito");
            }).catch((error: any) => {
              console.error("Error al eliminar usuario:", error);
              this.mostrarToast("Error al eliminar usuario");
            });
          }
        }
      ]
    });

    await alert.present();
  }

  // Agregar un usuario
  async agregarUsuario() {
    const modal = await this.alertController.create({
      header: 'Agregar Usuario',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre'
        },
        {
          name: 'password',
          type: 'text',
          placeholder: 'Contraseña'
        },
        {
          name: 'email',
          type: 'text',
          placeholder: 'Correo'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Adición cancelada.');
          }
        },
        {
          text: 'Agregar',
          handler: async (data) => {
            if (data.nombre && data.password && data.email) {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(data.email)) {
                await this.mostrarToast("Por favor ingrese un correo válido.");
                return;
              }

              await this.firestore.collection('usuarios').add({
                nombre: data.nombre,
                password: data.password,
                email: data.email
              }).then(() => {
                this.mostrarToast("Usuario agregado con éxito");
                this.cargarUsuarios();  
              }).catch((error: any) => {
                console.error("Error al agregar usuario:", error);
                this.mostrarToast("Error al agregar usuario");
              });
            } else {
              console.log("No se agregó el usuario, faltan datos.");
              await this.mostrarToast("Usuario no agregado, faltan datos");
            }
          }
        }
      ]
    });

    await modal.present();
  }

  // Mostrar toast
  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
