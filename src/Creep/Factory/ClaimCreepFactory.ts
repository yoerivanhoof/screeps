import {ClaimClaimingState} from "../State/ClaimCreep/ClaimClaimingState";
import {CreepState} from "../State/CreepState";
import {BaseCreep} from "../Types/BaseCreep";
import {ClaimCreep} from "../Types/ClaimCreep";
import {AbstractCreepFactory} from "./AbstractCreepFactory";
import {BaseRoom} from "../../Room/Types/BaseRoom";

export class ClaimCreepFactory extends AbstractCreepFactory {
  public static creepType = 'claim';
  public factoryInitialize(creep: Creep): BaseCreep {
    if(creep.memory.state){
      const states: {[state:string]: CreepState} = {
        'ClaimClaimingState': new ClaimClaimingState()
      };
      return new ClaimCreep(creep, states[creep.memory.state]);
    }
    return new ClaimCreep(creep, new ClaimClaimingState());
  }

  public factorySpawn(room: BaseRoom): boolean {
    if(Game.flags.claim) {
      return Game.spawns[room.room.name].spawnCreep(ClaimCreep.body, `Claim: ${Game.time}`, {memory: {role: 'claim', room: Game.spawns[room.room.name].room.name}}) === 0;
    }else{
      return false;
    }
  }
}
