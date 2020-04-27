import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MarkdownTreeService } from './tree/tree.service';
import { MarkdownBlockComponent } from './block/block.component';
import { mdContent, mdFootnoteDefinition } from './tree/tree-types';

@Component( {
  selector: '[markdown]',
  templateUrl: './block/block.component.html',
  styleUrls: [ './block/block.component.scss' ],
  providers: [ MarkdownTreeService ],
  encapsulation: ViewEncapsulation.None,
  host: { 'class': 'markdown' }
} )
/** Renders a markdown text into an angular view */
export class MarkdownRootComponent extends MarkdownBlockComponent {

  constructor( tree: MarkdownTreeService ) { super( tree ); }

  /** Returns the array of parsed footnotes */
  public get notes(): mdFootnoteDefinition[] { return this.tree.notes || []; }

  @Input( 'markdown' ) set parse( source: string | mdContent ) {
    // Parses the source md file into an mdAST syntax tree
    this.node = typeof source === 'string' ? this.tree.parse( source ) : source;
  }

  /** Navigation event emitted when a link is clicked on */
  @Output( 'navigate' ) navigate = new EventEmitter<string>();
}