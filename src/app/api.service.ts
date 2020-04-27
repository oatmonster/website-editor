import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { environment } from '../environments/environment';

@Injectable()
export class ApiService {

  constructor( private httpClient: HttpClient ) { }

  public getBlogPosts( query?: { page?: number, tags?: string[] } ): Observable<Array<IBlogPost>> {
    let params = new HttpParams();
    if ( query ) {
      params = this.parseQuery( query );
    }

    return this.httpClient.get<Array<IBlogPost>>( environment.apiUrl + 'blog', { params: params } ).pipe(
      tap( res => {
        console.log( res );
      } )
    );
  }

  public getBlogPost( id: string ): Observable<IBlogPost> {
    return this.httpClient.get<IBlogPost>( environment.apiUrl + 'blog/' + id ).pipe(
      tap( res => {
        console.log( res );
      } ),
      catchError( err => {
        return of( null );
      } )
    );
  }

  public getProjects( query?: { page?: number, tags?: string[] } ) {
    let params = new HttpParams();
    if ( query ) {
      params = this.parseQuery( query );
    }
    return this.httpClient.get<Array<IProject>>( environment.apiUrl + 'projects', { params: params } ).pipe(
      tap( res => {
        console.log( res );
      } )
    );
  }

  public getProject( id: string ): Observable<IProject> {
    return this.httpClient.get<IProject>( environment.apiUrl + 'projects/' + id ).pipe(
      tap( res => {
        console.log( res );
      } )
    );
  }

  private parseQuery( query ): HttpParams {
    let params = new HttpParams();
    Object.entries( query ).forEach( entry => {
      let key = entry[ 0 ];
      let value = entry[ 1 ];

      if ( query[ key ] ) {
        if ( Array.isArray( value ) ) {
          params = params.set( key, value.join( '+' ) );
        } else {
          params = params.set( key, value.toString() );
        }
      }
    } );

    return params;
  }

}

export interface IPost {
  id: string;
  title: string;
  subtitle?: string;
  thumbnailUrl: string;
  tags?: string[];
  content?: string;
}

export interface IBlogPost extends IPost {
  date?: Date;
}

export interface IProject extends IPost {
  blogPosts?: string[];
}