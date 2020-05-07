import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkdownRootComponent } from './markdown.component';
import { MarkdownBlockComponent } from './block/block.component';
import { MarkdownInlineComponent } from './inline/inline.component';
import { HighlightComponent } from './highlight/highlight.component'
import { IFrameComponent } from './iframe.component';
import { markdownFactory } from './markdown-factory';


@NgModule( {
  imports: [
    CommonModule
  ],
  declarations: [
    MarkdownRootComponent,
    MarkdownInlineComponent,
    MarkdownBlockComponent,
    HighlightComponent,
    IFrameComponent
  ],
  providers: [
    {
      provide: 'markdown',
      useFactory: markdownFactory,
    },
  ],
  exports: [
    MarkdownRootComponent
  ]
} )
export class MarkdownModule { }