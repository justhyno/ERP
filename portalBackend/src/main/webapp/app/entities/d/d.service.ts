import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ID } from 'app/shared/model/d.model';

type EntityResponseType = HttpResponse<ID>;
type EntityArrayResponseType = HttpResponse<ID[]>;

@Injectable({ providedIn: 'root' })
export class DService {
  public resourceUrl = SERVER_API_URL + 'api/ds';

  constructor(protected http: HttpClient) {}

  create(d: ID): Observable<EntityResponseType> {
    return this.http.post<ID>(this.resourceUrl, d, { observe: 'response' });
  }

  update(d: ID): Observable<EntityResponseType> {
    return this.http.put<ID>(this.resourceUrl, d, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ID>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ID[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
