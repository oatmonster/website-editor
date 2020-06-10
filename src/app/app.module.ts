import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MarkdownModule } from './markdown/markdown.module';
import { NgxElectronModule } from 'ngx-electron';

import { appRoutes } from './routes';

import { AppComponent } from './app.component';
import { BrowserComponent } from './browser/browser.component';
import { LoginComponent } from './login/login.component';
import { BlogFormComponent } from './blog-form/blog-form.component';

import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { DialogService } from './dialog.service';
import { AuthInterceptor } from './auth.interceptor';

@NgModule( {
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot( appRoutes ),
    NgxElectronModule,
    MarkdownModule
  ],
  declarations: [
    AppComponent,
    BlogFormComponent,
    BrowserComponent,
    LoginComponent
  ],
  providers: [
    ApiService,
    AuthService,
    DialogService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [ AppComponent ]
} )
export class AppModule { }
