import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'a',
        loadChildren: () => import('./a/a.module').then(m => m.PortalBackendAModule),
      },
      {
        path: 'b',
        loadChildren: () => import('./b/b.module').then(m => m.PortalBackendBModule),
      },
      {
        path: 'c',
        loadChildren: () => import('./c/c.module').then(m => m.PortalBackendCModule),
      },
      {
        path: 'd',
        loadChildren: () => import('./d/d.module').then(m => m.PortalBackendDModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class PortalBackendEntityModule {}
