import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IC, C } from 'app/shared/model/c.model';
import { CService } from './c.service';
import { CComponent } from './c.component';
import { CDetailComponent } from './c-detail.component';
import { CUpdateComponent } from './c-update.component';

@Injectable({ providedIn: 'root' })
export class CResolve implements Resolve<IC> {
  constructor(private service: CService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IC> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((c: HttpResponse<C>) => {
          if (c.body) {
            return of(c.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new C());
  }
}

export const cRoute: Routes = [
  {
    path: '',
    component: CComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'portalBackendApp.c.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CDetailComponent,
    resolve: {
      c: CResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'portalBackendApp.c.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CUpdateComponent,
    resolve: {
      c: CResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'portalBackendApp.c.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CUpdateComponent,
    resolve: {
      c: CResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'portalBackendApp.c.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
