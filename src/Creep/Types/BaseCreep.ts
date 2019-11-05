export abstract class BaseCreep {
  get creep(): Creep{
    return Game.creeps[this._creep.name];
  }
  private _creep: Creep;

  public constructor(creep: Creep) {
    this._creep = creep;
  }

  public abstract work():void;
}
