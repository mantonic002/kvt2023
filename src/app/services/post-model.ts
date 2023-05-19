import { UserModel } from "./user-model";

export class PostModel {
    id!: number;
    content!: string;
    creationDate!: Date;
    user!: UserModel;
}