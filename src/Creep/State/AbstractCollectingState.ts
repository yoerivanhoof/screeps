import {State} from "./State";
import {BaseCreep} from "../Types/BaseCreep";
import {HarvesterStoreEnergyState} from "./HarvesterStoreEnergyState";
import {CoreFunc} from "../../coreFunc";

export abstract class AbstractCollectingState implements State {
  private sources: Source[] = [];

  public enter(creep: BaseCreep): void {
    creep.creep.say('Collecting');
    this.sources = creep.creep.room.find(FIND_SOURCES);
  }

  public execute(creep: BaseCreep): void {
    const minIndex = CoreFunc.findClosesSource(this.sources, creep.creep.pos);
    if (creep.creep.harvest(this.sources[minIndex]) === ERR_NOT_IN_RANGE) {
      creep.creep.moveTo(this.sources[minIndex], {visualizePathStyle: {stroke: '#ffaa00'}});
    }
  }

  abstract exit(creep: BaseCreep): void;

}
