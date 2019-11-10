import {BaseCreep} from "../Types/BaseCreep";

export abstract class AbstractCreepFactory {
  public abstract factoryInitialize(creep:Creep): BaseCreep;
  public abstract factorySpawn(spawn:string): boolean;

  public initialize(creep:Creep): BaseCreep{
    return  this.factoryInitialize(creep);
  }

  public spawn(spawn:string):boolean{
    return this.factorySpawn(spawn);
  }
}
