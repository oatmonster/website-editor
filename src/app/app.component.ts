import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component( {
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
} )
export class AppComponent implements OnInit {
  title = 'editor';

  constructor( private electronService: ElectronService ) { }

  ngOnInit(): void {
    this.electronService.ipcRenderer.on( 'newBlog', ( event, args ) => {
      console.log( 'New Blog' );
    } );
  }
}
