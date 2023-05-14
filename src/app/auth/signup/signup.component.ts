import { Router } from '@angular/router';
import { AuthService } from './../shared/auth.service';
import { SignupRequestPayload } from './signup-request.payload';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  signupRequestPayload: SignupRequestPayload;
  signupForm!: FormGroup;
  
  constructor(private authService: AuthService, private router: Router, private tostr: ToastrService){
    this.signupRequestPayload = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: ''
    };
  }

  ngOnInit(){
    this.signupForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  signup(){
    this.signupRequestPayload.firstName = this.signupForm.get('firstName')?.value;
    this.signupRequestPayload.lastName = this.signupForm.get('lastName')?.value;
    this.signupRequestPayload.email = this.signupForm.get('email')?.value;
    this.signupRequestPayload.username = this.signupForm.get('username')?.value;
    this.signupRequestPayload.password = this.signupForm.get('password')?.value;

    this.authService.signup(this.signupRequestPayload)
      .subscribe(() => {
        this.router.navigate(['/login'],
         { queryParams: { registered: 'true' } });
      }, () => {
        this.tostr.error('Registration failed, try again!')
      }
      );
  }
}
