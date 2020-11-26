export interface IC {
  id?: number;
}

export class C implements IC {
  constructor(public id?: number) {}
}
