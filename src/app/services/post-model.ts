import { UserModel } from "./user-model";

export class PostModel {
  id!: number;
  content!: string;
  creationDate!: Date;
  user!: UserModel;
  reactions: ReactionModel[];
  comments: CommentModel[];
  editing: boolean;
}


export interface ReactionModel {
  reactionType: ReactionType;
  timestamp: string;
  userId: number;
}

export class CommentModel {
  id?: number
  text: string;
  timestamp: string;
  user: UserModel;
  isDeleted: boolean;
  childComments: CommentModel[];
  reactions: ReactionModel[];
}


  
export enum ReactionType {
    Like = 'LIKE',
    Dislike = 'DISLIKE',
    Heart = 'HEART',
  }