import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

@Component( {
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: [ './editor.component.scss' ]
} )
export class EditorComponent implements OnInit {

  public md: string;

  constructor( private httpClient: HttpClient ) { }

  blogForm = new FormGroup( {
    title: new FormControl(),
    subtitle: new FormControl( '' ),
    date: new FormControl(),
    thumbnailUrl: new FormControl(),
    tags: new FormControl( '' ),
    content: new FormControl(),
  } )

  ngOnInit(): void {
    this.httpClient.get( 'assets/test.md', { responseType: 'text' } )
      .subscribe( data => this.md = data );
  }

}
