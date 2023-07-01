import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroupModel } from './group-model';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

constructor(
    private apiService: ApiService,
    private config: ConfigService,
  ) {}

  getGroup(id: number): Observable<GroupModel> {
    return this.apiService.get(`${this.config.group_url}/${id}`);
  }

  createGroup(group: GroupModel): Observable<GroupModel> {
    return this.apiService.post(this.config.group_url, group);
  }

  deleteGroup(groupId: number) {
    return this.apiService.delete(`${this.config.delete_group_url}/${groupId}`);
  }
  
  updateGroup(groupToEdit: GroupModel) {
    return this.apiService.put(this.config.update_group_url, groupToEdit);
  }

  public getAllGroups(): Observable<GroupModel[]> {
    return this.apiService.get(this.config.group_url);
  }

  addPost(groupId: number, newPost: any) {
    return this.apiService.post(`${this.config.add_post_to_group}/${groupId}`, newPost)
  }

  // Add other group-related API methods here (e.g., createGroup, getAllGroups, etc.)
}
