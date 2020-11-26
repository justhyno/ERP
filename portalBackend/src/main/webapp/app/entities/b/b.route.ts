import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IB, B } from 'app/shared/model/b.model';
import { BService } from './b.service';
import { BComponent } from './b.component';
import { BDetailComponent } from './b-detail.component';
import { BUpdateComponent } from './b-update.component';

@Injectable({ providedIn: 'root' })
export class BResolve implements Resolve<IB> {
  constructor(private service: BService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IB> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((b: HttpResponse<B>) => {
          if (b.body) {
            return of(b.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new B());
  }
}

export const bRoute: Routes = [
  {
    path: '',
    component: BComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'portalBackendApp.b.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BDetailComponent,
    resolve: {
      b: BResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'portalBackendApp.b.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BUpdateComponent,
    resolve: {
      b: BResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'portalBackendApp.b.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BUpdateComponent,
    resolve: {
      b: BResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'portalBackendApp.b.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
