import { IB } from 'app/shared/model/b.model';

export interface IA {
  id?: number;
  bs?: IB[];
}

export class A implements IA {
  constructor(public id?: number, public bs?: IB[]) {}
}
