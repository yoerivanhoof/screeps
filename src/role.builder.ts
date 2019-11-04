import {CoreFunc} from "./coreFunc";
import {Role} from "./role";

export class RoleBuilder implements Role {

  public run(creep: Creep) {
    if (creep.memory.building && creep.carry.energy === 0) {
      creep.memory.building = false;
      creep.say('🔄 harvest');
    }
    if (!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
      creep.memory.building = true;
      creep.say('🚧 build');
    }
    if (creep.memory.building) {
      const repairs = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.hits < 1000)
        }
      });
      if(repairs.length > 0){
        const closestIndex = CoreFunc.findClosestRepair(repairs, creep.pos);
        if (repairs.length) {
          if (creep.repair(repairs[closestIndex]) === ERR_NOT_IN_RANGE) {
            creep.moveTo(repairs[closestIndex], {visualizePathStyle: {stroke: '#ffffff'}});
          }
        }
      }else {
        const constructions = creep.room.find(FIND_CONSTRUCTION_SITES);
        const closestIndex = CoreFunc.findClosestBuild(constructions, creep.pos);
        if (constructions.length) {
          if (creep.build(constructions[closestIndex]) === ERR_NOT_IN_RANGE) {
            creep.moveTo(constructions[closestIndex], {visualizePathStyle: {stroke: '#ffffff'}});
          }
        }
      }
    } else {
      const sources = creep.room.find(FIND_SOURCES);
      // let minIndex = CoreFunc.findClosesSource(sources, creep.pos);
      if (creep.harvest(sources[1]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
      }
    }
  }
}
