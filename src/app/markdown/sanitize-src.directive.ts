import { Directive, HostBinding, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Directive( {
  selector: '[sanitizeSrc]'
} )
export class SanitizeSrcDirective {

  @Input() sanitizeSrc: string;

  constructor( private sanitizer: DomSanitizer ) {
  }

  @HostBinding( 'src' )
  get src(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl( this.sanitizeSrc );
  }
}