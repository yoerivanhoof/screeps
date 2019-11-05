import {BaseCreep} from "./BaseCreep";
import {CoreFunc} from "../../coreFunc";

export class UpgraderCreep extends BaseCreep {
  work(): void {
    if (this.creep.memory.upgrading && this.creep.carry.energy === 0) {
      this.creep.memory.upgrading = false;
      this.creep.say('🔄 harvest');
    }
    if (!this.creep.memory.upgrading && this.creep.carry.energy === this.creep.carryCapacity) {
      this.creep.memory.upgrading = true;
      this.creep.say('⚡ upgrade');
    }
    if (this.creep.memory.upgrading) {
      if (this.creep.upgradeController(this.creep.room.controller as StructureController) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo((this.creep.room.controller as StructureController).pos, { visualizePathStyle: { stroke: '#ffffff' } });
      }
    }
    else {
      const sources = this.creep.room.find(FIND_SOURCES);
      const minIndex = CoreFunc.findClosesSource(sources, this.creep.pos);
      if (this.creep.harvest(sources[minIndex]) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(sources[minIndex], { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    }
  }

}
