
import {CoreCreep} from "./core.creep";

export class RoleHarvester {

  public static run(creep: Creep) {
    if (creep.carry.energy < creep.carryCapacity) {
      const sources = creep.room.find(FIND_SOURCES);
      const minIndex = CoreCreep.findClosesSource(sources, creep.pos);
      if (creep.harvest(sources[minIndex]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[minIndex], { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    }
    else {
      const targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType === STRUCTURE_EXTENSION
            && (structure as StructureExtension).energy !== (structure as StructureExtension).energyCapacity
            || structure.structureType === STRUCTURE_SPAWN)
            && (structure as StructureSpawn).energy !== (structure as StructureSpawn).energyCapacity;
        }
      });
      if (targets.length > 0) {
        if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
      }
    }
  }
}
