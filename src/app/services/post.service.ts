import { ConfigService, ApiService, UserService } from './';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel, ReactionModel, CommentModel } from './post-model';
import { Router } from '@angular/router';
import { UserModel } from './user-model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  user: UserModel;

  constructor(
    private apiService: ApiService,
    private config: ConfigService,
    private userService: UserService,
  ) {}

  public getAllPosts(): Observable<PostModel[]> {
    return this.apiService.get(this.config.posts_url);
  }

  public getPostsByGroup(groupId: number): Observable<PostModel[]> {
    return this.apiService.get(`${this.config.posts_by_group_url}/${groupId}`);
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

  public addPostReaction(postId: number, reactionData: ReactionModel): Observable<any> {
    return this.apiService.post(`${this.config.add_post_reaction_url}/${postId}`, reactionData);
  }
  
  public addCommentReaction(commentId: number, reactionData: ReactionModel): Observable<any> {
    return this.apiService.post(`${this.config.add_comment_reaction_url}/${commentId}`, reactionData);
  }
  
  public addComment(postId: number, comment: CommentModel): Observable<any> {
    return this.apiService.post(`${this.config.add_comment_url}/${postId}`, comment);
  }
  
  public addChildComment(commentId: number, comment: CommentModel): Observable<any> {
    return this.apiService.post(`${this.config.add_child_comment_url}/${commentId}`, comment);
  }
  
}
