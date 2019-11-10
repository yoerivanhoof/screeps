import {BaseCreep} from "../Types/BaseCreep";
import {CreepState} from "./CreepState";

export class GlobalCreepState implements CreepState {
  public enter(creep: BaseCreep): void {
    // todo
  }

  public execute(creep: BaseCreep): void {
    if (creep.creep.ticksToLive) {
      if (creep.creep.ticksToLive < 100) {
        // todo create and set state renewCreep
      }
    }
  }

  public exit(creep: BaseCreep): void {
    // todo
  }

}
