import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

import { ApiService } from '../api.service';

@Component( {
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: [ './editor.component.scss' ]
} )
export class EditorComponent implements OnInit {

  public md: string;

  constructor( private httpClient: HttpClient, private apiService: ApiService ) { }

  blogForm = new FormGroup( {
    title: new FormControl(),
    subtitle: new FormControl( '' ),
    date: new FormControl(),
    thumbnailUrl: new FormControl(),
    tags: new FormControl( '' ),
    content: new FormControl(),
  } );

  ngOnInit(): void {
    this.httpClient.get( 'assets/test.md', { responseType: 'text' } )
      .subscribe( data => this.md = data );
  }

  onSubmit(): void {
    console.log( this.blogForm.value );
    this.apiService.submitBlogPost( {
      title: this.blogForm.value.title,
      subtitle: this.blogForm.value.subtitle,
      date: this.blogForm.value.date,
      thumbnailUrl: this.blogForm.value.thumbnailUrl,
      tags: this.blogForm.value.tags.split( ' ' ),
      content: this.blogForm.value.content
    } ).subscribe( res => {
      if ( res ) {
        console.log( 'Post Successful' );
        this.blogForm.reset();
      } else {
        console.log( 'Post Failed' );
      }
    } );
  }

}
