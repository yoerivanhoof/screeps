import {BaseCreep} from "./BaseCreep";
import {CoreFunc} from "../../coreFunc";

export class GuardCreep extends BaseCreep{
  work(): void {
    const hostiles = this.creep.room.find(FIND_HOSTILE_CREEPS);

    if(hostiles.length > 0){
      const closestHostile = CoreFunc.findClosestEnemy(hostiles,  this.creep.pos);
      const result =  this.creep.attack(hostiles[closestHostile]);
      if(result === ERR_NOT_IN_RANGE){
        this.creep.moveTo(hostiles[closestHostile], { visualizePathStyle: { stroke: '#ffffff' } });
      }
    }else{
      this.creep.moveTo( this.creep.room.find(FIND_FLAGS)[0], { visualizePathStyle: { stroke: '#ffffff' } })
    }
  }

}
