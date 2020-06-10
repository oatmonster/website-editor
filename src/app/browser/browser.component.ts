import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IBlogPost, ApiService } from '../api.service';
import { DialogService } from '../dialog.service';

@Component( {
  selector: 'browser',
  templateUrl: './browser.component.html',
  styleUrls: [ './browser.component.scss' ]
} )
export class BrowserComponent implements OnInit {

  public blogPosts: IBlogPost[];

  public activeRow: IBlogPost = null;
  public activeId: string = null;

  constructor( private apiService: ApiService, private router: Router, private dialogService: DialogService ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(): void {
    this.apiService.getBlogPosts().subscribe( res => {
      this.blogPosts = res;
    } );
  }

  selectRow( post: IBlogPost ) {
    if ( this.activeRow === post ) {
      this.activeRow = null;
      this.activeId = null;
    } else {
      this.activeRow = post;
      this.activeId = post.id;
    }
  }

  open( post: IBlogPost ) {
    this.router.navigate( [ 'edit', 'blog', post.id ] );
  }

  delete( id: string ): void {
    if ( this.dialogService.confirm( "Delete blog post?" ) ) {
      this.apiService.deleteBlogPost( id ).subscribe( res => {
        if ( res ) console.log( 'Deleted' );
        else console.log( 'Not deleted' );
        this.refreshList();
      } );
    }
  }
}
