export class ObjectBase {
  static UID = 0;

  static CNAME = 'ObjectBase';

  id: string;

  constructor() {
    this.id = this.createId((this.constructor as typeof ObjectBase).UID++);
  }

  createId(uid: number) {
    return `${(this.constructor as typeof ObjectBase).CNAME}_${uid++}`;
  }
}
