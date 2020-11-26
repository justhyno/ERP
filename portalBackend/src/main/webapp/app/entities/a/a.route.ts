import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IA, A } from 'app/shared/model/a.model';
import { AService } from './a.service';
import { AComponent } from './a.component';
import { ADetailComponent } from './a-detail.component';
import { AUpdateComponent } from './a-update.component';

@Injectable({ providedIn: 'root' })
export class AResolve implements Resolve<IA> {
  constructor(private service: AService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IA> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((a: HttpResponse<A>) => {
          if (a.body) {
            return of(a.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new A());
  }
}

export const aRoute: Routes = [
  {
    path: '',
    component: AComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'portalBackendApp.a.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ADetailComponent,
    resolve: {
      a: AResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'portalBackendApp.a.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AUpdateComponent,
    resolve: {
      a: AResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'portalBackendApp.a.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AUpdateComponent,
    resolve: {
      a: AResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'portalBackendApp.a.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
