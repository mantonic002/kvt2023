import { Component } from '@angular/core';
import { AuthService, UserService } from '../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user: any;

  constructor(
    private authService: AuthService,
    private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.currentUser;
  }

  hasSignedIn() {
    return !!this.userService.currentUser;
  }

  userName() {
    const user = this.userService.currentUser;
    return user.username;
  }

  logout() {
    this.authService.logout();
  }
}
