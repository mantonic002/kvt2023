import { PostService } from '../services/post.service';
import { Component, OnInit } from '@angular/core';
import { PostModel } from '../services/post-model';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  posts!: PostModel[];
  datepipe: DatePipe = new DatePipe('en-US');
  constructor(private postService: PostService){
  }

  ngOnInit(): void {
    this.getPosts();
  }

  public formatDate(date: Date): string {

    let formattedDate =  this.datepipe.transform(date, 'dd-MMM-YYYY HH:mm:ss');
    if (formattedDate != null) {
      return formattedDate;
    } else{
      return '';
    }
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
