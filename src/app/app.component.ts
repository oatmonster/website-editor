import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
} )
export class AppComponent implements OnInit {
  title = 'editor';

  public md: string;

  constructor( private httpClient: HttpClient ) { }

  ngOnInit(): void {
    this.httpClient.get( 'assets/test.md', { responseType: 'text' } )
      .subscribe( data => this.md = data );
  }
}
