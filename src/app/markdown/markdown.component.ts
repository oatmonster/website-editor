import { Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { MarkdownTreeService } from './tree/tree.service';
import { MarkdownBlockComponent } from './block/block.component';
import { mdContent, mdFootnoteDefinition } from './tree/tree-types';

@Component( {
  selector: 'markdown',
  templateUrl: './block/block.component.html',
  styleUrls: [ './block/block.component.scss' ],
  providers: [ MarkdownTreeService ],
  encapsulation: ViewEncapsulation.None,
} )
/** Renders a markdown text into an angular view */
export class MarkdownRootComponent extends MarkdownBlockComponent {

  constructor( tree: MarkdownTreeService ) { super( tree ); }

  /** Returns the array of parsed footnotes */
  public get notes(): mdFootnoteDefinition[] { return this.tree.notes || []; }

  @Input()
  id: string;

  @Input()
  type: 'blog' | 'project';

  @Input( 'markdown' ) set parse( source: string | mdContent ) {
    // Parses the source md file into an mdAST syntax tree
    this.node = typeof source === 'string' ? this.tree.parse( source ) : source;
    this.tree.id = this.id;
    this.tree.type = this.type;
  }
}
