import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PostService } from '../services/post';
import { ConfirmDeleteComponent } from '../components/confirm-delete/confirm-delete.component';
import { addIcons } from 'ionicons';
import { add, trash, image } from 'ionicons/icons';
import { CustomDatePipe } from '../pipes/custom-date-pipe';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, CustomDatePipe]
})
export class HomePage {
  posts$ = this.postService.posts$;

  constructor(private postService: PostService, private modalCtrl: ModalController) {
    addIcons({ add, trash, image });
  }

  async confirmDelete(id: number) {
    const modal = await this.modalCtrl.create({
      component: ConfirmDeleteComponent,
      breakpoints: [0, 0.5],
      initialBreakpoint: 0.5
    });

    await modal.present();
    const { role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      await this.postService.deletePost(id);
    }
  }
}