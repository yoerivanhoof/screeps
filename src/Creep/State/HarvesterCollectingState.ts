import {BaseCreep} from "../Types/BaseCreep";
import {HarvesterStoreEnergyState} from "./HarvesterStoreEnergyState";
import {State} from "./State";
import {AbstractCollectingState} from "./AbstractCollectingState";

export class HarvesterCollectingState extends AbstractCollectingState {

  public execute(creep: BaseCreep): void {
    super.execute(creep);

    if(creep.creep.carry.energy === creep.creep.carryCapacity){
      creep.state = new HarvesterStoreEnergyState();
    }
  }

  public exit(creep: BaseCreep): void {
    // todo
  }

}
