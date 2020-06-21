import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signForm: FormGroup;
  isLoading = false;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.signForm = new FormGroup({
      'email': new FormControl(null,[ Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    });

  }

  onSignup(){
    this.isLoading = true;
    const email = this.signForm.get('email').value;
    const password = this.signForm.get('password').value;
    this.authService.createUser(email, password);
  }


}
