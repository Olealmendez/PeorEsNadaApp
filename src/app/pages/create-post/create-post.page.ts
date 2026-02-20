import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { PostService } from '../../services/post';
import { addIcons } from 'ionicons';
import { camera, arrowBack } from 'ionicons/icons';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, RouterModule]
})
export class CreatePostPage {
  postForm: FormGroup;
  capturedImage: string | undefined;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router
  ) {
    addIcons({ camera, arrowBack });
    
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt
      });
      this.capturedImage = image.dataUrl;
    } catch (error) {
      console.log('Error en cámara', error);
    }
  }

  async onSubmit() {
    if (this.postForm.valid) {
      await this.postService.addPost({
        id: Date.now(),
        title: this.postForm.value.title,
        description: this.postForm.value.description,
        date: new Date().toISOString(),
        image: this.capturedImage
      });
      this.router.navigate(['/home']);
      this.postForm.reset();
      this.capturedImage = undefined;
    } else {
      this.postForm.markAllAsTouched();
    }
  }
}