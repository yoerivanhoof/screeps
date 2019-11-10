import {HarvesterCreep} from "../../Types/HarvesterCreep";
import {CreepState} from "../CreepState";
import {HarvesterCollectingState} from "./HarvesterCollectingState";

export class HarvesterStoreEnergyState implements CreepState {
  public enter(creep: HarvesterCreep): void {
    creep.creep.say('Store energy');
  }

  public execute(creep: HarvesterCreep): void {
    let targets = this.findEmptyContainer(creep.creep.room);
    if(targets.length < 1){
      for (const roomName in Game.rooms) {
        if(roomName !== creep.creep.room.name && targets.length < 1){
          targets = this.findEmptyContainer(Game.rooms[roomName]);
        }
      }
    }

    if (targets.length > 0) {
      if (creep.creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
      }
    }

    if (creep.creep.carry.energy === 0) {
      creep.state = new HarvesterCollectingState();
    }
  }

  private findEmptyContainer(room: Room): Structure[]{
    return room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (structure.structureType === STRUCTURE_EXTENSION
          && (structure as StructureExtension).energy !== (structure as StructureExtension).energyCapacity
          || structure.structureType === STRUCTURE_SPAWN
          && (structure as StructureSpawn).energy !== (structure as StructureSpawn).energyCapacity
          || structure.structureType === STRUCTURE_TOWER
          && (structure as StructureTower).energy !== (structure as StructureTower).energyCapacity);
      }
    });
  }

  public exit(creep: HarvesterCreep): void {
    // todo
  }

}
