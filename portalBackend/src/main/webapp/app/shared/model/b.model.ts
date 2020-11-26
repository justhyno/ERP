import { IA } from 'app/shared/model/a.model';

export interface IB {
  id?: number;
  a?: IA;
}

export class B implements IB {
  constructor(public id?: number, public a?: IA) {}
}
