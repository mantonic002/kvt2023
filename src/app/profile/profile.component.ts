import { Component } from '@angular/core';
import { AuthService, UserService } from '../services';
import { UserModel } from '../services/user-model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: UserModel;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.currentUser;
  }
}
