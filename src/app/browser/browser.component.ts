import { Component, OnInit } from '@angular/core';
import { IBlogPost, ApiService } from '../api.service';

@Component( {
  selector: 'browser',
  templateUrl: './browser.component.html',
  styleUrls: [ './browser.component.scss' ]
} )
export class BrowserComponent implements OnInit {

  public blogPosts: IBlogPost[];

  public activeRow: IBlogPost = null;
  public activeId: string = null;

  constructor( private apiService: ApiService ) { }

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

  delete( id: string ): void {
    // TODO confirmation
    this.apiService.deleteBlogPost( id ).subscribe( res => {
      if ( res ) console.log( 'Deleted' );
      else console.log( 'Not deleted' );
      this.refreshList();
    } )
  }

}
