import {CoreFunc} from "../../../coreFunc";
import {BuilderCreep} from "../../Types/BuilderCreep";
import {CreepState} from "../CreepState";
import {BuilderCollectingState} from "./BuilderCollectingState";

export class BuilderBuildState implements CreepState {
  public enter(creep: BuilderCreep): void {
    creep.creep.say('Building');
  }

  public execute(creep: BuilderCreep): void {
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

      let constructions = creep.creep.room.find(FIND_CONSTRUCTION_SITES);

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

  public exit(creep: BuilderCreep): void {
    // todo
  }

}
