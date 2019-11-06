import {BaseCreep} from "../Types/BaseCreep";
import {State} from "../../StateMachine/State";

export abstract class CreepState implements State<BaseCreep>{
  public enter(creep: BaseCreep):void{
    creep.creep.memory.state = this.constructor.name;
  };
  public abstract execute(creep: BaseCreep):void;
  public abstract exit(creep: BaseCreep):void;
}
