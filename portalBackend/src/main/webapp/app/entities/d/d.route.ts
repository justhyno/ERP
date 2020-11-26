import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ID, D } from 'app/shared/model/d.model';
import { DService } from './d.service';
import { DComponent } from './d.component';
import { DDetailComponent } from './d-detail.component';
import { DUpdateComponent } from './d-update.component';

@Injectable({ providedIn: 'root' })
export class DResolve implements Resolve<ID> {
  constructor(private service: DService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ID> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((d: HttpResponse<D>) => {
          if (d.body) {
            return of(d.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new D());
  }
}

export const dRoute: Routes = [
  {
    path: '',
    component: DComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'portalBackendApp.d.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DDetailComponent,
    resolve: {
      d: DResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'portalBackendApp.d.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DUpdateComponent,
    resolve: {
      d: DResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'portalBackendApp.d.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DUpdateComponent,
    resolve: {
      d: DResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'portalBackendApp.d.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
