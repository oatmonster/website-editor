import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth.service';

@Component( {
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
} )
export class AppComponent implements OnInit {
  title = 'Editor';

  constructor( private authService: AuthService ) { }

  public loggedIn(): boolean {
    return !!this.authService.getToken();
  }

  public firstLogin(): boolean {
    return this.authService.firstLogin();
  }

  ngOnInit(): void {
  }
}
