import { Routes } from '@angular/router';

import { BrowserComponent } from './browser/browser.component';
import { BlogFormComponent } from './blog-form/blog-form.component';

export const appRoutes: Routes = [
  {
    path: 'edit/blog/:id',
    component: BlogFormComponent
  },
  {
    path: 'edit/blog',
    component: BlogFormComponent
  },
  {
    path: '',
    component: BrowserComponent
  }
]