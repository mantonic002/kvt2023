import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UserService } from '../services';
import { PostModel, ReactionType, CommentModel, ReactionModel } from '../services/post-model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  @Input() posts: PostModel[];
  @Input() commentText: { [postId: number]: string };
  @Output() postAdded: EventEmitter<void> = new EventEmitter<void>(); // Event emitter for post addition
  ReactionType = ReactionType;
  childCommentText: {[commentId: number]: string} = {};

  constructor(private postService: PostService, private userService: UserService) {}

  ngOnInit(): void {
    this.initializeCommentText();
  }

  initializeCommentText() {
    this.posts.forEach((post) => {
      this.commentText[post.id] = '';
      post.comments.forEach((comment) => {
        this.childCommentText[comment.id] = '';
      })
    });
  }

  onReact(postId: number, reactionType: ReactionType, commentId?: number) {
    const reactionData: ReactionModel = {
      reactionType,
      timestamp: new Date().toISOString(),
      userId: this.userService.currentUser.id,
    };
    console.log(this.posts);
    
  
    if (commentId) {
      this.postService.addCommentReaction(commentId, reactionData).subscribe(
        () => {
          this.getPosts();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    } else {
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

  getChildComments(comment: CommentModel): CommentModel[] {
    return comment.childComments || [];
  }

  onAddComment(postId: number, comment: string) {
    const commentData: CommentModel = {
      text: comment,
      timestamp: new Date().toISOString(),
      user: this.userService.currentUser,
      isDeleted: false,
      reactions: [],
      childComments: [],
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

  onAddChildComment(commentId: number, comment: string) {
    const commentData: CommentModel = {
      text: comment,
      timestamp: new Date().toISOString(),
      user: this.userService.currentUser,
      isDeleted: false,
      reactions: [],
      childComments: [],
    };
    this.postService.addChildComment(commentId, commentData).subscribe(
      () => {
        this.getPosts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  handleAction(action: string, id: number) {
    if (action === 'edit') {
      const postToEdit = this.posts.find(post => post.id === id);
      postToEdit.editing = true;

    } else if (action === 'delete') {
      this.postService.deletePost(id).subscribe(
        () => {
          this.getPosts();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  editPost(post: PostModel) {

    this.postService.updatePost(post).subscribe(
      updatedPost => {
        this.getPosts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  

  private getPosts() {
    this.postAdded.emit();
  }
}
