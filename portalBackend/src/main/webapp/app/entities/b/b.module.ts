import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PortalBackendSharedModule } from 'app/shared/shared.module';
import { BComponent } from './b.component';
import { BDetailComponent } from './b-detail.component';
import { BUpdateComponent } from './b-update.component';
import { BDeleteDialogComponent } from './b-delete-dialog.component';
import { bRoute } from './b.route';

@NgModule({
  imports: [PortalBackendSharedModule, RouterModule.forChild(bRoute)],
  declarations: [BComponent, BDetailComponent, BUpdateComponent, BDeleteDialogComponent],
  entryComponents: [BDeleteDialogComponent],
})
export class PortalBackendBModule {}
