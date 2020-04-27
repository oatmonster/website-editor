import { Component, Input, ViewEncapsulation } from '@angular/core';

import { mdContent } from '../tree/tree-types';
import { MarkdownTreeService } from '../tree/tree.service';

@Component( {
  selector: '[md-block]',
  templateUrl: './block.component.html',
  styleUrls: [ './block.component.scss' ],
  encapsulation: ViewEncapsulation.None
} )
/** Renders a markdown text into an angular view */
export class MarkdownBlockComponent {

  constructor( readonly tree: MarkdownTreeService ) { }

  @Input( 'md-block' ) node: mdContent;

  // AOT safe children from the node
  get children() { return ( "children" in this.node ) ? this.node.children : [] }
}

