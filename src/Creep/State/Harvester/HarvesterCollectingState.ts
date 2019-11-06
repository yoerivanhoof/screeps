import {BaseCreep} from "../../Types/BaseCreep";
import {HarvesterStoreEnergyState} from "./HarvesterStoreEnergyState";
import {CreepState} from "../CreepState";
import {AbstractCollectingState} from "../AbstractCollectingState";
import {HarvesterCreep} from "../../Types/HarvesterCreep";

export class HarvesterCollectingState extends AbstractCollectingState {

  public execute(creep: HarvesterCreep): void {
    super.execute(creep);

    if(creep.creep.carry.energy === creep.creep.carryCapacity){
      creep.state = new HarvesterStoreEnergyState();
    }
  }

  public exit(creep: HarvesterCreep): void {
    // todo
  }

}
