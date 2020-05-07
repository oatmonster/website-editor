import { Routes } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { BrowserComponent } from './browser/browser.component';

export const appRoutes: Routes = [
  {
    path: 'editor',
    component: EditorComponent
  },
  {
    path: '**',
    component: BrowserComponent
  }
]