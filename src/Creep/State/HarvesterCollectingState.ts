import {BaseCreep} from "../Types/BaseCreep";
import {HarvesterStoreEnergyState} from "./HarvesterStoreEnergyState";
import {State} from "./State";

export class HarvesterCollectingState implements State {
  private sources: Source[] = [];

  public enter(creep: BaseCreep): void {
    creep.creep.say('Collecting');
    this.sources = creep.creep.room.find(FIND_SOURCES);
  }

  public execute(creep: BaseCreep): void {
    creep.collectResource();

    if(creep.creep.carry.energy === creep.creep.carryCapacity){
      creep.state = new HarvesterStoreEnergyState();
    }
  }

  public exit(creep: BaseCreep): void {
    // todo
  }

}
