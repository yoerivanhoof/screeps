import {BaseCreep} from "./BaseCreep";
import {CoreFunc} from "../../coreFunc";

export class BuilderCreep extends BaseCreep{
  work(): void {
    if (this.creep.memory.building && this.creep.carry.energy === 0) {
      this.creep.memory.building = false;
      this.creep.say('🔄 harvest');
    }
    if (!this.creep.memory.building && this.creep.carry.energy === this.creep.carryCapacity) {
      this.creep.memory.building = true;
      this.creep.say('🚧 build');
    }
    if (this.creep.memory.building) {
      const repairs = this.creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.hits < 1000)
        }
      });
      if (repairs.length > 0) {
        const closestIndex = CoreFunc.findClosestRepair(repairs, this.creep.pos);
        if (repairs.length) {
          if (this.creep.repair(repairs[closestIndex]) === ERR_NOT_IN_RANGE) {
            this.creep.moveTo(repairs[closestIndex], {visualizePathStyle: {stroke: '#ffffff'}});
          }
        }
      } else {
        const constructions = this.creep.room.find(FIND_CONSTRUCTION_SITES);
        const closestIndex = CoreFunc.findClosestBuild(constructions, this.creep.pos);
        if (constructions.length) {
          if (this.creep.build(constructions[closestIndex]) === ERR_NOT_IN_RANGE) {
            this.creep.moveTo(constructions[closestIndex], {visualizePathStyle: {stroke: '#ffffff'}});
          }
        }
      }
    } else {
      const sources = this.creep.room.find(FIND_SOURCES);
      // let minIndex = CoreFunc.findClosesSource(sources, creep.pos);
      if (this.creep.harvest(sources[1]) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
      }
    }
  }

}
