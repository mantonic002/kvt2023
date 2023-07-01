import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services';
import { GroupModel } from '../services/group-model';
import { GroupService } from '../services/group.service';
import { CommentModel, PostModel, ReactionModel, ReactionType } from '../services/post-model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-group-posts',
  templateUrl: './group-posts.component.html',
  styleUrls: ['./group-posts.component.css']
})
export class GroupPostsComponent implements OnInit {
  groupId: number;
  group: GroupModel;
  posts: PostModel[];
  newPost: any = {
    content: '',
    user: null,
    creationDate: null
  };

  commentText: { [postId: number]: string } = {};


  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private postService: PostService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.groupId = Number(params.get('id'));
      this.loadGroup();
    });
  }

  loadGroup(): void {
    this.groupService.getGroup(this.groupId).subscribe(
      response => {
        this.group = response;
        this.getPosts(this.groupId);
      },
      error => {
        console.log(error);
      }
    );
  }


  getPosts(id: number) {
    this.postService.getPostsByGroup(id).subscribe(
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

  save() {
    
    this.newPost.creationDate = new Date();
    this.newPost.user = this.userService.currentUser;

    this.groupService.addPost(this.groupId, this.newPost).subscribe(
      () => {
        this.newPost = {
          content: '',
          user: null,
          creationDate: null
        };
        this.loadGroup();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  onPostAdded() {
    this.loadGroup();
  }
}
