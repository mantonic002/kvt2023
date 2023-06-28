import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GroupModel } from '../services/group-model';
import { GroupService } from '../services/group.service';


@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  groups: GroupModel[];

  constructor(private groupService: GroupService) {}

  ngOnInit() {
    this.loadGroups();
  }

  loadGroups() {
    this.groupService.getAllGroups().subscribe(
      (response: GroupModel[]) => {
        this.groups = response
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
