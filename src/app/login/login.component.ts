import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ApiService } from '../api.service';

@Component( {
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
} )
export class LoginComponent implements OnInit {

  loginForm = new FormGroup( {
    password: new FormControl(),
  } );

  constructor( private apiService: ApiService ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.apiService.login( this.loginForm.value.password ).subscribe( res => {
      this.loginForm.reset();
      if ( res ) {
        console.log( 'Login Successful' );
      } else {
        console.log( 'Login Failed' );
      }
    } );
  }

}
