import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IB } from 'app/shared/model/b.model';

type EntityResponseType = HttpResponse<IB>;
type EntityArrayResponseType = HttpResponse<IB[]>;

@Injectable({ providedIn: 'root' })
export class BService {
  public resourceUrl = SERVER_API_URL + 'api/bs';

  constructor(protected http: HttpClient) {}

  create(b: IB): Observable<EntityResponseType> {
    return this.http.post<IB>(this.resourceUrl, b, { observe: 'response' });
  }

  update(b: IB): Observable<EntityResponseType> {
    return this.http.put<IB>(this.resourceUrl, b, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IB>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IB[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
