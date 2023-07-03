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

  isGroupAdmin(group: GroupModel): boolean {
    const currentUser = this.userService.currentUser;
    if(currentUser.role == 'ADMIN') {
      return true;
    }else {
      return group.admins && group.admins.some(admin => admin.user.id === currentUser.id);
    }
  }

  isAdmin(): boolean {
    const currentUser = this.userService.currentUser;
    return currentUser.role == 'ADMIN'

  }

  editGroup(group: GroupModel) {
    if (this.isGroupAdmin(group)) {
      this.groupToEdit = group;
      this.showEditForm = true;
    } else {
      alert("You are not authorized to edit this group.");
    }

  }

  updateGroup() {
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
    if (this.isAdmin) {
      if (confirm('Are you sure you want to delete this group?')) {
        const reason = prompt('Please enter the reason for deleting the group:');
        if (reason !== null && reason !== '') {
          if (confirm('Are you sure you want to delete this group?')) {
            this.groupService.deleteGroup(groupId, reason).subscribe(
              () => {
                this.groups = this.groups.filter(group => group.id !== groupId);
              },
              (error: HttpErrorResponse) => {
                alert(error.message);
              }
            );
          }
        } else {
          alert('Please provide a reason for deleting the group.');
        }
      }
    }
  } 

  getGroupJoinRequests(group: GroupModel) {
    console.log(group);
    return group.groupRequests;
  }

  sendJoinRequest(group: GroupModel) {
    this.groupService.sendJoinRequest(group.id).subscribe(
      () => {
        group.joinRequestSent = true;
        alert('Join request sent successfully.');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  approveGroupJoinRequest(groupId: number, requestId: number) {
    this.groupService.approveGroupJoinRequest(groupId, requestId).subscribe(
      () => {
        alert('Group join request approved successfully.');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  rejectGroupJoinRequest(groupId: number, requestId: number) {
    this.groupService.rejectGroupJoinRequest(groupId, requestId).subscribe(
      () => {
        alert('Group join request rejected successfully.');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
}
