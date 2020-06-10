import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component( {
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
} )
export class LoginComponent implements OnInit {

  loginForm = new FormGroup( {
    username: new FormControl(),
    password: new FormControl()
  } );

  public loginError = false;

  constructor( private authService: AuthService ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.loginError = false;
    this.authService.login( this.loginForm.value.username, this.loginForm.value.password ).subscribe( res => {
      this.loginForm.reset();
      if ( res ) {
        console.log( 'Login Successful' );
      } else {
        console.log( 'Login Failed' );
        this.loginError = true;
      }
    } );
  }

}
