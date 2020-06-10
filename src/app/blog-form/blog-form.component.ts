import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService, IBlogPost } from '../api.service';

@Component( {
  selector: 'blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: [ './blog-form.component.scss' ]
} )
export class BlogFormComponent implements OnInit {

  public post: IBlogPost;

  public new: boolean;

  public md: string;

  constructor( private apiService: ApiService, private activatedRoute: ActivatedRoute, private router: Router ) { }

  blogForm = new FormGroup( {
    public: new FormControl( false ),
    title: new FormControl( '' ),
    subtitle: new FormControl( '' ),
    date: new FormControl( '' ),
    tags: new FormControl( '' ),
    content: new FormControl( '' ),
  } );

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params => {

      // Check if creating a new post
      this.new = !params.has( 'id' );

      console.log( this.new );

      if ( this.new ) {

      } else {

        this.blogForm.get( 'title' ).disable();

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
    } );
  }

  onSubmit(): void {
    // TODO
    // Update submit to check if title changed

    console.log( this.blogForm.value );
    if ( this.new ) {
      this.apiService.submitBlogPost( {
        title: this.blogForm.value.title,
        subtitle: this.blogForm.value.subtitle,
        date: this.blogForm.value.date,
        tags: this.blogForm.value.tags.split( ' ' ),
        content: this.blogForm.value.content,
        public: this.blogForm.value.public
      } ).subscribe( res => {
        if ( res ) {
          console.log( 'Post Successful' );
          this.blogForm.reset();
          this.updatePreview();
          this.router.navigate( [ '' ] );
        } else {
          console.log( 'Post Failed' );
        }
      } );
    } else {
      this.apiService.updateBlogPost( this.post.id, {
        subtitle: this.blogForm.value.subtitle,
        date: this.blogForm.value.date,
        tags: this.blogForm.value.tags.split( ' ' ),
        content: this.blogForm.value.content,
        public: this.blogForm.value.public
      } ).subscribe( res => {
        if ( res ) {
          console.log( 'Saved' );
          this.blogForm.reset();
          this.updatePreview();
          this.router.navigate( [ '' ] );
        } else {
          console.log( 'Save Failed' );
        }
      } );
    }
  }

  updatePreview(): void {
    this.md = this.blogForm.value.content;
  }

  cancel(): void {
    //TODO Confirmation
    if ( this.blogForm.dirty ) {
      if ( confirm( "Discard unsaved changes?" ) ) {
        this.router.navigate( [ '' ] );
      }
    } else {
      this.router.navigate( [ '' ] );
    }
  }

  delete(): void {
    if ( confirm( "Delete blog post?" ) ) {
      this.apiService.deleteBlogPost( this.post.id ).subscribe( res => {
        if ( res ) {
          console.log( 'Deleted' );
          this.router.navigate( [ '' ] );
        } else {
          console.log( 'Not deleted' );
        }
      } );
    }
  }
}
