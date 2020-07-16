import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Injectable( {
  providedIn: 'root',
} )
export class DialogService {

  constructor( private electronService: ElectronService ) { }

  public confirm( message: string ): boolean {
    if ( this.electronService.isElectronApp ) {
      return this.electronService.ipcRenderer.sendSync( 'dialog', message );
    } else {
      return confirm( message );
    }
  }
}