import {CreepState} from "./CreepState";
import {BaseCreep} from "../Types/BaseCreep";

export class GlobalCreepState implements CreepState{
  enter(creep: BaseCreep): void {
  }

  execute(creep: BaseCreep): void {
    if(creep.creep.ticksToLive) {
      if (creep.creep.ticksToLive < 100) {
        //todo create and set state renewCreep
      }
    }
  }

  exit(creep: BaseCreep): void {
  }

}
