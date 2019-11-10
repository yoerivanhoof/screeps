import {ClaimCreep} from "../../Types/ClaimCreep";
import {CreepState} from "../CreepState";

export class ClaimClaimingState implements CreepState {
  public enter(creep: ClaimCreep): void {
    // todo
  }
  
  public execute(creep: ClaimCreep): void {
    if(Game.flags.claim) {
      if (Game.flags.claim.room) {
        const result = creep.creep.claimController(Game.flags.claim.room.controller as StructureController);
        if (result === -9) {
          creep.creep.moveTo((Game.flags.claim.room.controller as StructureController).pos);
        }else{
          console.log(result);
          creep.creep.moveTo(Game.flags.claim);
        }
      }else{
        creep.creep.moveTo(Game.flags.claim);
      }
    }else{
      console.log(`Claimer ready. no flag set`);
    }

  }

  public exit(creep: ClaimCreep): void {
    // todo
  }

  

}
