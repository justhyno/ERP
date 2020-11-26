import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PortalBackendSharedModule } from 'app/shared/shared.module';
import { DComponent } from './d.component';
import { DDetailComponent } from './d-detail.component';
import { DUpdateComponent } from './d-update.component';
import { DDeleteDialogComponent } from './d-delete-dialog.component';
import { dRoute } from './d.route';

@NgModule({
  imports: [PortalBackendSharedModule, RouterModule.forChild(dRoute)],
  declarations: [DComponent, DDetailComponent, DUpdateComponent, DDeleteDialogComponent],
  entryComponents: [DDeleteDialogComponent],
})
export class PortalBackendDModule {}
