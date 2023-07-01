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


  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
    this.admins = [];

  }
}

export class GroupAdminModel {
  id!: number;
  user: UserModel;
  group: GroupModel;
}
