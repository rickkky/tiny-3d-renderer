import { Scene } from '/scene/scene';

class UniqueIdGenerator {
  private static _id = 0;

  public static get uid() {
    return `${this._id++}`;
  }
}

export interface INodeOptions {
  name?: string;

  scene?: Scene;
}

export class Node {
  private _uid: string;

  public get uid() {
    return this._uid;
  }

  public name: string = '';

  constructor(options: INodeOptions = {}) {
    this._uid = UniqueIdGenerator.uid;

    if (options.name) {
      this.name = options.name;
    }
  }
}
