import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Credentials } from './credentials';
import { LoginService } from './credentials.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  error: any;
  public user = new Credentials('', '');
  public form: FormGroup;

  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.form = this.fb.group ( {
      username: [null , Validators.compose ( [ Validators.required ] )] , password: [null , Validators.compose ( [ Validators.required ] )]
    } );
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(user) {
    this.loginService
      .post(user)
      .then(result => {
        if (result) {
          this.router.navigate(['/']);
        }
      })
      .catch(error => this.error = error);
  }

}
