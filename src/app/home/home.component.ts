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
  ReactionType = ReactionType;
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

  onDelete(postId: number) {
    this.postService.deletePost(postId).subscribe(
      () => {
        this.getPosts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onReact(postId: number, reactionType: ReactionType, commentId?: number) {
    const reactionData: ReactionModel = {
      reactionType,
      timestamp: new Date().toISOString(),
      userId: this.userService.currentUser.id,
    };
  
    if (commentId) {
      // React to a comment
      this.postService.addCommentReaction(commentId, reactionData).subscribe(
        () => {
          this.getPosts();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    } else {
      // React to a post
      this.postService.addPostReaction(postId, reactionData).subscribe(
        () => {
          this.getPosts();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }
  
  getReactionCount(post: PostModel | CommentModel, reactionType: ReactionType): number {
    const reactions = post.reactions.filter((reaction) => reaction.reactionType === reactionType);
    return reactions.length;
  }



  getComments(post: PostModel): CommentModel[] {
    return post.comments;
  }

  onAddComment(postId: number, comment: string) {
    const commentData: CommentModel = {
      text: comment,
      timestamp: new Date().toISOString(),
      userId: this.userService.currentUser.id,
      isDeleted: false,
      reactions: [],
    };
    this.postService.addComment(postId, commentData).subscribe(
      () => {
        this.getPosts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
