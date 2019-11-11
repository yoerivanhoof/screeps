import {CreepState} from "../CreepState";
import {WorkCreep} from "../../Types/WorkCreep";
import {GetWorkState} from "./GetWorkState";

export class WorkState implements CreepState{
  enter(creep: WorkCreep): void {
    // todo get work
  }

  execute(creep: WorkCreep): void {
    if(creep.doWork()){
      creep.state = new GetWorkState();
    }
  }

  exit(creep: WorkCreep): void {
    // todo work is done, notify workmanager
  }

}
