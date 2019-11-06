import {CoreFunc} from "../coreFunc";
import {CoreCreep} from "./core.Creep";

export class RoleTower {
  public static run(tower: StructureTower){
    const hostiles = tower.room.find(FIND_HOSTILE_CREEPS);

    if(hostiles.length > 0){
      const closestHostile = CoreFunc.findClosestEnemy(hostiles, tower.pos);
      tower.attack(hostiles[closestHostile]);
    }
  }
}
