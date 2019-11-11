import {BaseCreep} from "../Types/BaseCreep";
import {BaseRoom} from "../../Room/Types/BaseRoom";

export abstract class AbstractCreepFactory {
  public static creepType = 'abstract';
  public abstract factoryInitialize(creep:Creep): BaseCreep;
  public abstract factorySpawn(room:BaseRoom): boolean;

  public initialize(creep:Creep): BaseCreep{
    return  this.factoryInitialize(creep);
  }

  public spawn(room:BaseRoom):boolean{
    return this.factorySpawn(room);
  }

  protected canSpawn(room:BaseRoom):boolean{
    return room.spawn.length > 0;
  }
}
