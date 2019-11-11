import {State} from "../../Abstract/StateMachine/State";
import {BaseCreep} from "../Types/BaseCreep";

export abstract class CreepState implements State<BaseCreep>{
  public enter(creep: BaseCreep):void{
    creep.creep.memory.state = this.constructor.name;
  };
  public abstract execute(creep: BaseCreep):void;
  public abstract exit(creep: BaseCreep):void;
}
