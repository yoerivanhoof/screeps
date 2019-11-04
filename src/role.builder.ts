import {CoreCreep} from "./core.creep";

export class RoleBuilder {

  public static run(creep: Creep) {
    if (creep.memory.building && creep.carry.energy == 0) {
      creep.memory.building = false;
      creep.say('🔄 harvest');
    }
    if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
      creep.memory.building = true;
      creep.say('🚧 build');
    }
    if (creep.memory.building) {
      const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      const closestIndex = CoreCreep.findClosestBuild(targets, creep.pos);
      if (targets.length) {
        if (creep.build(targets[closestIndex]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[closestIndex], { visualizePathStyle: { stroke: '#ffffff' } });
        }
      }
    }
    else {
      const sources = creep.room.find(FIND_SOURCES);
      // let minIndex = CoreCreep.findClosesSource(sources, creep.pos);
      if (creep.harvest(sources[1]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    }
  }
}
