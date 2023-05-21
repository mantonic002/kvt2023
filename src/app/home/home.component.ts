import { UserService } from '../services';
import { PostService } from '../services/post.service';
import { Component, OnInit } from '@angular/core';
import { PostModel } from '../services/post-model';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { UserModel } from '../services/user-model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  newPost: any;
  posts!: PostModel[];
  datepipe: DatePipe = new DatePipe('en-US');
  constructor(private postService: PostService, private userService: UserService){
  }

  ngOnInit(): void {
    this.getPosts();
    this.newPost={
      content: '',
      user: null,
      creationDate: null
    }
  }

  public formatDate(date: Date): string {

    let formattedDate =  this.datepipe.transform(date, 'dd-MMM-YYYY HH:mm:ss');
    if (formattedDate != null) {
      return formattedDate;
    } else{
      return '';
    }
  }

  save(){
    this.newPost.date = new Date();
    this.newPost.user = this.userService.currentUser;

    this.postService.addPost(this.newPost).subscribe(response => {
      this.getPosts();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);

    });
  }

  onDelete(postId: number) {
    this.postService.deletePost(postId).subscribe(() => {
      this.getPosts();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    });
  }


  getPosts() {
    this.postService.getAllPosts().subscribe(
      (Response: PostModel[]) => {
        this.posts = Response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      );
  }

}
