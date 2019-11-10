import {BaseCreep} from "../../Types/BaseCreep";
import {CreepState} from "../CreepState";

export class RenewCreepState implements CreepState{
  public enter(creep: BaseCreep): void {
    // todo
  }

  public execute(creep: BaseCreep): void {


    if(true){ // todo creep is renewed
      creep.revertToPreviousState();
    }
  }

  public exit(creep: BaseCreep): void {
    // todo
  }

}
