import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _api_url = 'http://localhost:8080/api';
  private _auth_url = this._api_url + '/auth';

  private _login_url = this._auth_url + '/login';

  get login_url(): string {
    return this._login_url;
  }

  private _whoami_url = this._auth_url + '/whoami';

  get whoami_url(): string {
    return this._whoami_url;
  }

  private _signup_url = this._auth_url + '/signup';

  get signup_url(): string {
    return this._signup_url;
  }

  private _change_password_url = this._auth_url + '/change-password'

  get change_password_url(): string {
    return this._change_password_url;
  }

  private _update_user_url = this._auth_url + '/update'

  get update_user_url(): string {
    return this._update_user_url;
  }


  private _group_url = this._api_url + '/group';

  get group_url(): string {
    return this._group_url;
  }

  private _groups_user_url = this._group_url + '/user';

  get groups_user_url(): string {
    return this._groups_user_url;
  }

  private _update_group_url = this._group_url + '/update';

  get update_group_url(): string {
    return this._update_group_url;
  }

  private _delete_group_url = this._group_url + '/delete';

  get delete_group_url(): string {
    return this._delete_group_url;
  }

  private _add_post_to_group = this._group_url + '/add_post';

  get add_post_to_group(): string {
    return this._add_post_to_group;
  }


  private _post_url = this._api_url + '/post';

  private _posts_url = this._post_url + '/all';

  get posts_url(): string {
    return this._posts_url;
  }
  private _posts_by_group_url = this._post_url + "/by-group";
  
  get posts_by_group_url(): string {
    return this._posts_by_group_url;
  }

  private _add_post_url = this._post_url + '/add';

  get add_post_url(): string {
    return this._add_post_url;
  }

  private _update_post_url = this._post_url + '/update';

  get update_post_url(): string {
    return this._update_post_url;
  }

  private _delete_post_url = this._post_url + '/delete';

  get delete_post_url(): string {
    return this._delete_post_url;
  }


  private _user_url = ''



  private _users_url = this._user_url + '/all';

  get users_url(): string {
    return this._users_url;
  }

  private _add_post_reaction_url = this._post_url + '/add_reaction';

  get add_post_reaction_url(): string {
    return this._add_post_reaction_url;
  }

  private _add_comment_url = this._post_url + '/add_comment';

  get add_comment_url(): string {
    return this._add_comment_url;
  }


  private _add_child_comment_url = this._post_url + '/add_child_comment';

  get add_child_comment_url(): string {
    return this._add_child_comment_url;
  }


  private _add_comment_reaction_url = this._post_url + '/add_comment_reaction';

  get add_comment_reaction_url(): string {
    return this._add_comment_reaction_url;
  }

  
}
