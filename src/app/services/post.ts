import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject } from 'rxjs';

export interface Post {
  id: number;
  title: string;
  description: string;
  date: string;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private STORAGE_KEY = 'community_posts';
  private _posts = new BehaviorSubject<Post[]>([]);
  public posts$ = this._posts.asObservable();

  constructor() {
    this.loadPosts();
  }

  async loadPosts() {
    const { value } = await Preferences.get({ key: this.STORAGE_KEY });
    if (value) {
      this._posts.next(JSON.parse(value));
    }
  }

  async addPost(post: Post) {
    const currentPosts = this._posts.value;
    const updatedPosts = [post, ...currentPosts];
    this._posts.next(updatedPosts);
    await this.savePosts(updatedPosts);
  }

  async deletePost(id: number) {
    const currentPosts = this._posts.value;
    const updatedPosts = currentPosts.filter(p => p.id !== id);
    this._posts.next(updatedPosts);
    await this.savePosts(updatedPosts);
  }

  private async savePosts(posts: Post[]) {
    await Preferences.set({
      key: this.STORAGE_KEY,
      value: JSON.stringify(posts)
    });
  }
}