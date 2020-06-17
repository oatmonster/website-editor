import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../environments/environment';

@Injectable()
export class AuthService {

  private token: string;

  private first = true;

  constructor( private httpClient: HttpClient ) { }

  public getToken(): string {
    return this.token;
  }

  public refreshToken(): void {
    this.token = undefined;
  }

  public firstLogin(): boolean {
    return this.first;
  }

  public login( username: string, password: string ) {
    const httpOptions = {
      headers: new HttpHeaders( {
        'Content-Type': 'application/json'
      } )
    };

    return this.httpClient.post( environment.apiUrl + '/login', { 'username': username, 'password': password }, httpOptions ).pipe(
      map( ( res: any ) => {
        this.token = res.token;
        this.first = false;
        return true;
      } ),
      catchError( err => {
        return of( false );
      } )
    );
  }
}