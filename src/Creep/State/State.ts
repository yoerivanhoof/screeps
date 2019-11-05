import {BaseCreep} from "../Types/BaseCreep";

export abstract class State {
  public abstract enter(creep: BaseCreep):void;
  public abstract execute(creep: BaseCreep):void;
  public abstract exit(creep: BaseCreep):void;
}
