import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

import { AuthService } from './auth.service';

@Component( {
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
} )
export class AppComponent implements OnInit {
  title = 'editor';

  constructor( private electronService: ElectronService, private authService: AuthService ) { }

  public loggedIn(): boolean {
    return !!this.authService.getToken();
  }

  ngOnInit(): void {
    if ( this.electronService.isElectronApp ) {
      this.electronService.ipcRenderer.on( 'newBlog', ( event, args ) => {
        console.log( 'New Blog' );
      } );
    }
  }
}
