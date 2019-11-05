import {CoreFunc} from "../../coreFunc";
import {BaseCreep} from "../Types/BaseCreep";
import {BuilderBuildState} from "./BuilderBuildState";
import {State} from "./State";

export class BuilderCollectingState implements State {
  private sources: Source[] = [];

  public enter(creep: BaseCreep): void {
    creep.creep.say('Collecting');
    this.sources = creep.creep.room.find(FIND_SOURCES);
  }

  public execute(creep: BaseCreep): void {
    creep.collectResource();

    if(creep.creep.carry.energy === creep.creep.carryCapacity){
      creep.state = new BuilderBuildState();
    }
  }

  public exit(creep: BaseCreep): void {
    // todo
  }

}
