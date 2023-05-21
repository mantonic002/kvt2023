import { ConfigService, ApiService } from './';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from './post-model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private apiService: ApiService,
    private config: ConfigService,
  ) {}

  public getAllPosts(): Observable<PostModel[]> {
    return this.apiService.get(this.config.posts_url);
  }

  public addPost(post: any): Observable<any> {
    return this.apiService.post(this.config.add_post_url, post);
  }

  public updatePost(post: PostModel): Observable<PostModel> {
    return this.apiService.put(this.config.update_post_url, post);
  }

  public deletePost(postId: number): Observable<void> {
    return this.apiService.delete(`${this.config.delete_post_url}/${postId}`);
  }
}
