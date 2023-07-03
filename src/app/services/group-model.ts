import { PostModel } from './post-model';
import { UserModel } from './user-model';

export class GroupModel {
  id!: number;
  name: string;
  description: string;
  creationDate: string;
  isSuspended: boolean;
  suspendedReason!: string;
  posts: PostModel[];
  admins: GroupAdminModel[];
  groupRequests: JoinRequestModel[];
  joinRequestSent: boolean;



  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
    this.admins = [];
    this.groupRequests = [];
    this.joinRequestSent = false;
  }
}

export class GroupAdminModel {
  id!: number;
  user: UserModel;
  group: GroupModel;
}

export class JoinRequestModel {
  id!: number;
  user: UserModel;
  group: GroupModel;
  approved: boolean;
}
