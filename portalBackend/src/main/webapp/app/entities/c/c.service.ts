import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IC } from 'app/shared/model/c.model';

type EntityResponseType = HttpResponse<IC>;
type EntityArrayResponseType = HttpResponse<IC[]>;

@Injectable({ providedIn: 'root' })
export class CService {
  public resourceUrl = SERVER_API_URL + 'api/cs';

  constructor(protected http: HttpClient) {}

  create(c: IC): Observable<EntityResponseType> {
    return this.http.post<IC>(this.resourceUrl, c, { observe: 'response' });
  }

  update(c: IC): Observable<EntityResponseType> {
    return this.http.put<IC>(this.resourceUrl, c, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IC>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IC[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
