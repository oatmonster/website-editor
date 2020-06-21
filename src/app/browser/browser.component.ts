import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IBlogPost, ApiService } from '../api.service';
import { DialogService } from '../dialog.service';
import { Subscription } from 'rxjs';

@Component( {
  selector: 'browser',
  templateUrl: './browser.component.html',
  styleUrls: [ './browser.component.scss' ]
} )
export class BrowserComponent implements OnInit, OnDestroy {

  public blogPosts: IBlogPost[];

  public activeRow: IBlogPost = null;
  public activeId: string = null;

  public page: number;
  public pageCount: number;
  public pageList: number[];
  private pageSize = 10;

  private queryParamSubscription: Subscription;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.queryParamSubscription = this.activatedRoute.queryParams.subscribe( params => {
      this.page = Math.max( 1, parseInt( params[ 'page' ], 10 ) || 1 );
      this.apiService.getBlogPosts( { page: this.page } ).subscribe( res => {

        this.blogPosts = res.posts;
        this.pageCount = Math.ceil( res.count / this.pageSize );
        this.updatePages();
      } );
    } );
  }

  ngOnDestroy(): void {
    this.queryParamSubscription.unsubscribe();
  }

  refreshList(): void {
    this.router.navigate( [ '' ], { queryParams: { page: this.page } } );
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

  private updatePages() {
    const toDisplay = 5;
    let minPage = this.page - Math.floor( toDisplay / 2 );
    let maxPage = this.page + Math.floor( toDisplay / 2 );
    let extraLeft = Math.max( minPage * -1 + 1, 0 );
    let extraRight = Math.max( maxPage - this.pageCount, 0 );

    maxPage = Math.min( maxPage + extraLeft, this.pageCount );
    minPage = Math.max( 1, minPage - extraRight );

    this.pageList = [];
    for ( let i = minPage; i <= maxPage; i++ ) {
      this.pageList.push( i );
    }
  }
}
