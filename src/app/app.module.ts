import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MarkdownModule } from './markdown/markdown.module';

import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { BrowserComponent } from './browser/browser.component';

import { ApiService } from './api.service';
import { LoginComponent } from './login/login.component';
import { PreviewComponent } from './preview/preview.component';

@NgModule( {
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
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
