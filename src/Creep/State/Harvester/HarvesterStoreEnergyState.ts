import {BaseCreep} from "../../Types/BaseCreep";
import {HarvesterCollectingState} from "./HarvesterCollectingState";
import {CreepState} from "../CreepState";
import {HarvesterCreep} from "../../Types/HarvesterCreep";

export class HarvesterStoreEnergyState implements CreepState {
  public enter(creep: HarvesterCreep): void {
    creep.creep.say('Store energy');
  }

  public execute(creep: HarvesterCreep): void {
    const targets = creep.creep.room.find(FIND_STRUCTURES, {
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
      if (creep.creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
      }
    }else{
      creep.creep.say("All full")
    }

    if (creep.creep.carry.energy === 0) {
      creep.state = new HarvesterCollectingState();
    }
  }

  public exit(creep: HarvesterCreep): void {
    // todo
  }

}
