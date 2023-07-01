import { UserService } from '../services/user.service';
import { PostService } from '../services/post.service';
import { Component, OnInit } from '@angular/core';
import { PostModel, ReactionType, ReactionModel, CommentModel } from '../services/post-model';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  newPost: any = {
    content: '',
    user: null,
    creationDate: null
  };
  posts: PostModel[] = [];
  datepipe: DatePipe = new DatePipe('en-US');
  commentText: { [postId: number]: string } = {}; 
  constructor(private postService: PostService, private userService: UserService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postService.getAllPosts().subscribe(
      (response: PostModel[]) => {
        this.posts = response;
        this.initializeCommentText();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  initializeCommentText() {
    this.posts.forEach((post) => {
      this.commentText[post.id] = '';
    });
  }

  formatDate(date: Date): string {
    const formattedDate = this.datepipe.transform(date, 'dd-MMM-YYYY HH:mm:ss');
    return formattedDate || '';
  }

  save() {
    this.newPost.creationDate = new Date();
    this.newPost.user = this.userService.currentUser;

    this.postService.addPost(this.newPost).subscribe(
      () => {
        this.newPost = {
          content: '',
          user: null,
          creationDate: null
        };
        this.getPosts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onPostAdded() {
    this.getPosts();
  }
}
