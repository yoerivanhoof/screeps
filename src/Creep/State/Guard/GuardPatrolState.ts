import {CoreFunc} from "../../../coreFunc";
import {GuardCreep} from "../../Types/GuardCreep";
import {CreepState} from "../CreepState";

export class GuardPatrolState implements CreepState {
  public enter(creep: GuardCreep): void {
    // 
  }

  public execute(creep: GuardCreep): void {
    const hostiles = creep.creep.room.find(FIND_HOSTILE_CREEPS);
    const hostilesStruct = creep.creep.room.find(FIND_HOSTILE_STRUCTURES);

    if (hostiles.length > 0) {
      const closestHostile = CoreFunc.findClosestEnemy(hostiles, creep.creep.pos);
      const result = creep.creep.attack(hostiles[closestHostile]);
      if (result === ERR_NOT_IN_RANGE) {
        creep.creep.moveTo(hostiles[closestHostile], {visualizePathStyle: {stroke: '#ffffff'}});
      }
    }else if(hostilesStruct.length > 0){
      const result = creep.creep.attack(hostilesStruct[0]);
      if (result === ERR_NOT_IN_RANGE) {
        creep.creep.moveTo(hostilesStruct[0], {visualizePathStyle: {stroke: '#ffffff'}});
      }
    } else if (Game.flags.attack) {
      creep.creep.moveTo(Game.flags.attack, {visualizePathStyle: {stroke: '#ff0000'}});
    } else {
      creep.creep.moveTo(Game.flags.GUARDPOST, {visualizePathStyle: {stroke: '#ffffff'}})
    }
  }

  public exit(creep: GuardCreep): void {
    // 
  }

}
