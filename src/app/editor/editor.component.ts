import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService, IPost, IBlogPost, IProject } from '../api.service';

@Component( {
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: [ './editor.component.scss' ]
} )
export class EditorComponent implements OnInit {

  public post: IProject | IBlogPost;

  public type: string;

  public new: boolean;

  public md: string;

  constructor( private httpClient: HttpClient, private apiService: ApiService, private activatedRoute: ActivatedRoute, private router: Router ) { }

  blogForm = new FormGroup( {
    public: new FormControl( false ),
    title: new FormControl( '' ),
    subtitle: new FormControl( '' ),
    date: new FormControl( '' ),
    thumbnailUrl: new FormControl( '' ),
    tags: new FormControl( '' ),
    content: new FormControl( '' ),
  } );

  projectForm = new FormGroup( {
    public: new FormControl( false ),
    title: new FormControl( '' ),
    subtitle: new FormControl( '' ),
    thumbnailUrl: new FormControl( '' ),
    tags: new FormControl( '' ),
    content: new FormControl( '' ),
    blogPosts: new FormControl( '' )
  } );

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params => {

      // See if we're editing a blog post or a project
      if ( params.get( 'type' ) !== 'blog' && params.get( 'type' ) !== 'project' ) this.router.navigate[ '' ];
      this.type = params.get( 'type' );

      // Check if creating a new post
      this.new = !params.has( 'id' );

      if ( this.type === 'blog' ) {
        if ( this.new ) {

        } else {
          // Get the post to edit from the API
          this.apiService.getBlogPost( params.get( 'id' ) ).subscribe( res => {
            this.post = res;
            this.md = this.post.content;

            // Populate the form controls with the existing info
            this.blogForm.patchValue( this.post );

            let tagString = this.post.tags.join( ' ' );
            this.blogForm.patchValue( { tags: tagString } );
          } );
        }

      } else { // Editing a project
        if ( this.new ) {

        } else {
          // Get the post to edit from the API
          this.apiService.getProject( params.get( 'id' ) ).subscribe( res => {
            this.post = res;
            this.md = this.post.content;

            // Populate form controls with existing info
            this.blogForm.patchValue( this.post );

            let tagString = this.post.tags.join( ' ' );
            this.blogForm.patchValue( { tags: tagString } );
          } );
        }
      }
    } );
  }

  onSubmit(): void {

    // TODO
    // Update submit to check for type, if title changed
    // Add ngIf to form to change it based on edit type

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

  updatePreview(): void {
    this.md = this.blogForm.value.content;
  }

}
