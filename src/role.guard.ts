import {CoreFunc} from "./coreFunc";
import {Role} from "./role";

export class RoleGuard implements Role{
  public run(creep: Creep) {
    const hostiles = creep.room.find(FIND_HOSTILE_CREEPS);

    if(hostiles.length > 0){
      const closestHostile = CoreFunc.findClosestEnemy(hostiles, creep.pos);
      const result = creep.attack(hostiles[closestHostile]);
      if(result === ERR_NOT_IN_RANGE){
        creep.moveTo(hostiles[closestHostile], { visualizePathStyle: { stroke: '#ffffff' } });
      }
    }else{
      creep.moveTo(creep.room.find(FIND_FLAGS)[0], { visualizePathStyle: { stroke: '#ffffff' } })
    }
  }
}
