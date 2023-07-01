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
  showPasswordForm: boolean = false;
  showEditForm: boolean = false;
  oldPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  passwordChangeError: string;

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.currentUser;
  }

  togglePasswordForm() {
    this.showPasswordForm = !this.showPasswordForm;
    this.resetFormFields();
  }

  toggleEditForm() {
    this.showEditForm = !this.showEditForm;
  }

  cancelPasswordChange() {
    this.showPasswordForm = false;
    this.resetFormFields();
  }

  savePasswordChange() {
    this.passwordChangeError = null;

    if (this.newPassword !== this.confirmNewPassword) {
      this.passwordChangeError = "New password and confirm password must match.";
      return;
    }

    this.authService.changePassword(this.user.id, this.oldPassword, this.newPassword)
      .subscribe(
        () => {
          this.showPasswordForm = false;
          this.resetFormFields();
        },
        (error) => {
          this.passwordChangeError = error.message || "An error occurred while changing the password.";
        }
      );
  }

  updateProfile() {
    this.userService.updateUser(this.user)
      .subscribe(
        () => {
        },
        (error) => {
        }
      );
    this.showEditForm = false;

  }

  resetFormFields() {
    this.oldPassword = '';
    this.newPassword = '';
    this.confirmNewPassword = '';
  }
}
