import { PostModel } from "./post-model";

export interface GroupModel {
    id: number;
    name: string;
    description: string;
    creationDate: string;
    isSuspended: boolean;
    suspendedReason: string;
    posts: PostModel[];

  }