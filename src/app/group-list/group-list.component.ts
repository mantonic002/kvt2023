import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services';
import { GroupModel } from '../services/group-model';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  groups: GroupModel[];
  showEditForm: boolean = false;
  groupToEdit: GroupModel = new GroupModel('', '');

  constructor(private groupService: GroupService, private userService: UserService) {}

  ngOnInit() {
    this.loadGroups();
  }

  loadGroups() {
    this.groupService.getAllGroups().subscribe(
      (response: GroupModel[]) => {
        this.groups = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  refreshGroups() {
    this.loadGroups();
  }

  onGroupCreated() {
    this.refreshGroups();
  }

  canEditGroup(group: GroupModel): boolean {
    const currentUser = this.userService.currentUser;
    return group.admins && group.admins.some(admin => admin.user.id === currentUser.id);
  }

  editGroup(group: GroupModel) {
    if (this.canEditGroup(group)) {
      this.groupToEdit = group;
      this.showEditForm = true;
    } else {
      alert("You are not authorized to edit this group.");
    }

  }

  updateGroup() {
    console.log(this.groupToEdit.admins);

    this.groupService.updateGroup(this.groupToEdit).subscribe(
      (updatedGroup: GroupModel) => {
        this.refreshGroups();
        this.cancelEdit();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  cancelEdit() {
    this.groupToEdit = new GroupModel('', '');
    this.showEditForm = false;
  }

  deleteGroup(groupId: number) {
    if (confirm('Are you sure you want to delete this group?')) {
      this.groupService.deleteGroup(groupId).subscribe(
        () => {
          this.groups = this.groups.filter(group => group.id !== groupId);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }
}
