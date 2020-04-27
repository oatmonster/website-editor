import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SanitizeSrcDirective } from './sanitize-src.directive';

import { MarkdownRootComponent } from './markdown.component';
import { MarkdownBlockComponent } from './block/block.component';
import { MarkdownInlineComponent } from './inline/inline.component';
import { HighlightComponent } from './highlight/highlight.component'
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
    SanitizeSrcDirective
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