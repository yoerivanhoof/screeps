import {ScoutCreep} from "../../Types/ScoutCreep";
import {CreepState} from "../CreepState";

export class ScoutScoutingState implements CreepState {
  public enter(creep: ScoutCreep): void {
    // todo
  }
  
  public execute(creep: ScoutCreep): void {
    const scoutflag = Game.flags.scout;
    creep.creep.moveTo(scoutflag);
  }

  public exit(creep: ScoutCreep): void {
    // todo
  }

  

}
