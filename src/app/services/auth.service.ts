import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { UserService } from './user.service';
import { ConfigService } from './config.service';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable()
export class AuthService {

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private config: ConfigService,
    private router: Router
  ) {
  }

  private access_token = null;

  login(user: { username: any; password: any; }) {
    const loginHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    const body = {
      'username': user.username,
      'password': user.password
    };
    return this.apiService.post(this.config.login_url, JSON.stringify(body), loginHeaders)
      .pipe(map((res) => {
        console.log('Login success');
        this.access_token = res.accessToken;
        localStorage.setItem("jwt", res.accessToken);
      }));
  }

  signup(user: any) {
    const signupHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this.apiService.post(this.config.signup_url, JSON.stringify(user), signupHeaders)
      .pipe(map(() => {
        console.log('Sign up success');
      }));
  }

  logout() {
    this.userService.currentUser = null;
    this.access_token = null;
    this.router.navigate(['/login']);
  }

  changePassword(userId: number, oldPassword: string, newPassword: string): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    });
  
    const body = {
      'userId': userId,
      'oldPassword': oldPassword,
      'newPassword': newPassword
    };
  
    return this.apiService.post(this.config.change_password_url, JSON.stringify(body), headers)
      .pipe(
        catchError(error => {
          // Handle any error that occurs during the API call
          throw error;
        })
      );
  }
  

  tokenIsPresent() {
    return this.access_token != undefined && this.access_token != null;
  }

  getToken() {
    return this.access_token;
  }

}
