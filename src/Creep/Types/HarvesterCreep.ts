import {CoreFunc} from "../../coreFunc";
import {BaseCreep} from "./BaseCreep";

export class HarvesterCreep extends BaseCreep {
  public work(): void {
    if (this.creep.carry.energy < this.creep.carryCapacity) {

      const sources = this.creep.room.find(FIND_SOURCES);
      const minIndex = CoreFunc.findClosesSource(sources, this.creep.pos);
      if (this.creep.harvest(sources[minIndex]) === ERR_NOT_IN_RANGE) {
        this.creep.moveTo(sources[minIndex], {visualizePathStyle: {stroke: '#ffaa00'}});
      }
    } else {
      const targets = this.creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType === STRUCTURE_EXTENSION
            && (structure as StructureExtension).energy !== (structure as StructureExtension).energyCapacity
            || structure.structureType === STRUCTURE_SPAWN
            && (structure as StructureSpawn).energy !== (structure as StructureSpawn).energyCapacity
            || structure.structureType === STRUCTURE_TOWER
            && (structure as StructureTower).energy !== (structure as StructureTower).energyCapacity);
        }
      });
      if (targets.length > 0) {
        if (this.creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          this.creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }
      }
    }
  }

}
