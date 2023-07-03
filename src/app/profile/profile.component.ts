import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService, UserService } from '../services';
import { GroupModel } from '../services/group-model';
import { GroupService } from '../services/group.service';
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
  groups: GroupModel[];


  constructor(private groupService: GroupService, private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.currentUser;
    this.loadGroups();
  }

  loadGroups() {
    this.groupService.getGroupsByUser(this.user.id).subscribe(
      (response: GroupModel[]) => {
        this.groups = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
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
