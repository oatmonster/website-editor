import { Component, OnInit, Input } from '@angular/core';

@Component( {
  selector: 'preview',
  templateUrl: './preview.component.html',
  styleUrls: [ './preview.component.scss' ]
} )
export class PreviewComponent implements OnInit {

  @Input()
  rawMarkdown: string;

  public markdown: string;

  constructor() { }

  ngOnInit(): void {
    this.update();
  }

  update(): void {
    this.markdown = this.rawMarkdown;
  }

}
