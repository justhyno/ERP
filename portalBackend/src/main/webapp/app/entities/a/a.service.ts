import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IA } from 'app/shared/model/a.model';

type EntityResponseType = HttpResponse<IA>;
type EntityArrayResponseType = HttpResponse<IA[]>;

@Injectable({ providedIn: 'root' })
export class AService {
  public resourceUrl = SERVER_API_URL + 'api/as';

  constructor(protected http: HttpClient) {}

  create(a: IA): Observable<EntityResponseType> {
    return this.http.post<IA>(this.resourceUrl, a, { observe: 'response' });
  }

  update(a: IA): Observable<EntityResponseType> {
    return this.http.put<IA>(this.resourceUrl, a, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IA>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IA[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
