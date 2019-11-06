import {BaseCreep} from "../Types/BaseCreep";

export abstract class AbstractCreepFactory {
  public abstract factoryMethod(creep:Creep): BaseCreep;

  public build(creep:Creep): BaseCreep{
    return  this.factoryMethod(creep);
  }
}
