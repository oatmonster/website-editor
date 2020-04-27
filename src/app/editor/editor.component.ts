import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component( {
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: [ './editor.component.scss' ]
} )
export class EditorComponent implements OnInit {

  public md: string;

  constructor( private httpClient: HttpClient ) { }

  ngOnInit(): void {
    this.httpClient.get( 'assets/test.md', { responseType: 'text' } )
      .subscribe( data => this.md = data );
  }

}
