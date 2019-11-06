import {CreepState} from "../CreepState";
import {BaseCreep} from "../../Types/BaseCreep";

export class RenewCreepState implements CreepState{
  enter(creep: BaseCreep): void {
  }

  execute(creep: BaseCreep): void {


    if(true){ // todo creep is renewed
      creep.revertToPreviousState();
    }
  }

  exit(creep: BaseCreep): void {
  }

}
