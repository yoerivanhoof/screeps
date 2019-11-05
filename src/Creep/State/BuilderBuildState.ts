import {CoreFunc} from "../../coreFunc";
import {BaseCreep} from "../Types/BaseCreep";
import {BuilderCollectingState} from "./BuilderCollectingState";
import {State} from "./State";

export class BuilderBuildState implements State {
  public enter(creep: BaseCreep): void {
    creep.creep.say('Building');
  }

  public execute(creep: BaseCreep): void {
    const repairs = creep.creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (structure.hits < 1000)
      }
    });
    if (repairs.length > 0) {
      const closestIndex = CoreFunc.findClosestRepair(repairs, creep.creep.pos);
      if (repairs.length) {
        if (creep.creep.repair(repairs[closestIndex]) === ERR_NOT_IN_RANGE) {
          creep.creep.moveTo(repairs[closestIndex], {visualizePathStyle: {stroke: '#ffffff'}});
        }
      }
    } else {
      const constructions = creep.creep.room.find(FIND_CONSTRUCTION_SITES);
      const closestIndex = CoreFunc.findClosestBuild(constructions, creep.creep.pos);
      if (constructions.length) {
        if (creep.creep.build(constructions[closestIndex]) === ERR_NOT_IN_RANGE) {
          creep.creep.moveTo(constructions[closestIndex], {visualizePathStyle: {stroke: '#ffffff'}});
        }
      }
    }

    if (creep.creep.carry.energy === 0) {
      creep.state = new BuilderCollectingState();
    }
  }

  public exit(creep: BaseCreep): void {
    // todo
  }

}
