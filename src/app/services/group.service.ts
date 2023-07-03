import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  deleteGroup(groupId: number, reason: string) {
    const params = new HttpParams().set('reason', reason);
    return this.apiService.put(`${this.config.delete_group_url}/${groupId}`, null, params);
  }

  getGroupsByUser(userId: number) {
    return this.apiService.get(`${this.config.groups_user_url}/${userId}`);

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

  sendJoinRequest(groupId: number): Observable<any> {
    return this.apiService.post(`${this.config.group_url}/${groupId}/request`, null);
  }

  getGroupJoinRequests(groupId: number): Observable<any> {
    return this.apiService.get(`${this.config.group_url}/${groupId}/requests`);
  }

  approveGroupJoinRequest(groupId: number, requestId: number): Observable<any> {
    return this.apiService.put(`${this.config.group_url}/${groupId}/request/${requestId}/approve`, null);
  }
  
  rejectGroupJoinRequest(groupId: number, requestId: number): Observable<any> {
    return this.apiService.put(`${this.config.group_url}/${groupId}/request/${requestId}/reject`, null);
  }

  // Add other group-related API methods here (e.g., createGroup, getAllGroups, etc.)
}
