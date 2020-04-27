import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { MarkdownModule } from './markdown/markdown.module';

import { AppComponent } from './app.component';

@NgModule( {
  imports: [
    BrowserModule,
    HttpClientModule,
    MarkdownModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
  ],
  bootstrap: [ AppComponent ]
} )
export class AppModule { }
