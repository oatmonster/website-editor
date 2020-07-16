import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth.service';
import { SitemapService } from './sitemap.service';
import { ElectronService } from 'ngx-electron';

@Component( {
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
} )
export class AppComponent implements OnInit {
  title = 'Editor';

  constructor(
    private authService: AuthService,
    private sitemapService: SitemapService,
    private electronService: ElectronService
  ) {
    if ( this.electronService.isElectronApp ) {
      this.electronService.ipcRenderer.on( 'sitemap', async () => {
        let sitemap = await this.sitemapService.getSitemap();
        this.electronService.ipcRenderer.send( 'sitemap', sitemap );
      } );
    }
  }

  public loggedIn(): boolean {
    return !!this.authService.getToken();
  }

  public firstLogin(): boolean {
    return this.authService.firstLogin();
  }

  ngOnInit(): void {
  }
}
