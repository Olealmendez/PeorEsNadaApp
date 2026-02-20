import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-delete',
  template: `
    <ion-header>
      <ion-toolbar color="danger">
        <ion-title>Confirmar Acción</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding ion-text-center">
      <h2>¿Estás seguro?</h2>
      <p>Se eliminará este aviso de la comunidad permanentemente.</p>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-button expand="block" fill="outline" (click)="cancel()">Cancelar</ion-button>
          </ion-col>
          <ion-col>
            <ion-button expand="block" color="danger" (click)="confirm()">Eliminar</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  standalone: true,
  imports: [IonicModule]
})
export class ConfirmDeleteComponent {
  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(true, 'confirm');
  }
}