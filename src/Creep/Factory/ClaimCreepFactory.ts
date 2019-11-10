import {ClaimClaimingState} from "../State/ClaimCreep/ClaimClaimingState";
import {CreepState} from "../State/CreepState";
import {BaseCreep} from "../Types/BaseCreep";
import {ClaimCreep} from "../Types/ClaimCreep";
import {AbstractCreepFactory} from "./AbstractCreepFactory";

export class ClaimCreepFactory extends AbstractCreepFactory {
  public factoryInitialize(creep: Creep): BaseCreep {
    if(creep.memory.state){
      const states: {[state:string]: CreepState} = {
        'ClaimClaimingState': new ClaimClaimingState()
      };
      return new ClaimCreep(creep, states[creep.memory.state]);
    }
    return new ClaimCreep(creep, new ClaimClaimingState());
  }

  public factorySpawn(spawn: string): boolean {
    return Game.spawns[spawn].spawnCreep(ClaimCreep.body, `Claim: ${Game.time}`, {memory:{role:'claim'}}) === 0;
  }
}
