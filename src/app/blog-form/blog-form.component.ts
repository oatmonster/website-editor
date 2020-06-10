import { Component, OnInit, HostListener } from '@angular/core';
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

  public saveError = false;
  public deleteError = false;
  public submitError = false;

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

  // Confirmation before leaving with unsaved changes
  @HostListener( 'window:beforeunload', [ '$event' ] )
  unloadNotification( $event: any ) {
    if ( this.blogForm.dirty ) {
      $event.returnValue = true;
    }
  }

  updatePreview(): void {
    this.md = this.blogForm.value.content;
  }

  private clearFlags(): void {
    this.submitError = false;
    this.saveError = false;
    this.deleteError = false;
  }

  onSubmit(): void {
    // TODO
    // Update submit to check if title changed

    this.clearFlags();

    console.log( this.blogForm.value );
    if ( this.new ) {
      this.apiService.submitBlogPost( {
        title: this.blogForm.value.title,
        subtitle: this.blogForm.value.subtitle,
        date: this.blogForm.value.date,
        tags: this.blogForm.value.tags.split( ' ' ),
        content: this.blogForm.value.content,
        public: this.blogForm.value.public
      } ).subscribe(
        res => {
          console.log( 'Post Successful' );
          this.router.navigate( [ '' ] );
        },
        err => {
          console.log( 'Post Failed' );
          this.submitError = true;
        }
      );
    } else {
      this.apiService.updateBlogPost( this.post.id, {
        subtitle: this.blogForm.value.subtitle,
        date: this.blogForm.value.date,
        tags: this.blogForm.value.tags.split( ' ' ),
        content: this.blogForm.value.content,
        public: this.blogForm.value.public
      } ).subscribe(
        res => {
          console.log( 'Saved' );
          this.router.navigate( [ '' ] );
        },
        err => {
          console.log( 'Save Failed' );
          this.saveError = true;
        }
      );
    }
  }

  cancel(): void {
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
      this.clearFlags();
      this.apiService.deleteBlogPost( this.post.id ).subscribe(
        res => {
          console.log( 'Deleted' );
          this.router.navigate( [ '' ] );
        },
        err => {
          console.log( 'Delete Failed' );
          this.deleteError = true;
        }
      );
    }
  }
}
