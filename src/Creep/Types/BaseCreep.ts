export abstract class BaseCreep {
  public creep: Creep;

  public constructor(creep: Creep) {
    this.creep = creep;
  }

  public abstract work():void;
}
