import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MarkdownModule } from './markdown/markdown.module';

import { appRoutes } from './routes';

import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { BrowserComponent } from './browser/browser.component';

import { NgxElectronModule } from 'ngx-electron';

import { ApiService } from './api.service';
import { LoginComponent } from './login/login.component';
import { PreviewComponent } from './preview/preview.component';

@NgModule( {
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot( appRoutes, { useHash: true } ),
    NgxElectronModule,
    MarkdownModule
  ],
  declarations: [
    AppComponent,
    EditorComponent,
    BrowserComponent,
    LoginComponent,
    PreviewComponent
  ],
  providers: [
    ApiService
  ],
  bootstrap: [ AppComponent ]
} )
export class AppModule { }
