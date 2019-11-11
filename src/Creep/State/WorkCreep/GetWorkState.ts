import {CreepState} from "../CreepState";
import {WorkCreep} from "../../Types/WorkCreep";

export class GetWorkState implements CreepState {
  enter(creep: WorkCreep): void {
    // todo register for work
  }

  execute(creep: WorkCreep): void {
    // todo ask workmanager for work
  }

  exit(creep: WorkCreep): void {
    // todo
  }

}
