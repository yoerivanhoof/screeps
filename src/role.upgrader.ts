import {CoreCreep} from "./core.creep";

export class RoleUpgrader {

  public static run(creep: Creep) {
    if (creep.memory.upgrading && creep.carry.energy === 0) {
      creep.memory.upgrading = false;
      creep.say('🔄 harvest');
    }
    if (!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
      creep.memory.upgrading = true;
      creep.say('⚡ upgrade');
    }
    if (creep.memory.upgrading) {
      if (creep.upgradeController(creep.room.controller as StructureController) === ERR_NOT_IN_RANGE) {
        creep.moveTo((creep.room.controller as StructureController).pos, { visualizePathStyle: { stroke: '#ffffff' } });
      }
    }
    else {
      const sources = creep.room.find(FIND_SOURCES);
      const minIndex = CoreCreep.findClosesSource(sources, creep.pos);
      if (creep.harvest(sources[minIndex]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[minIndex], { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    }
  }
}

