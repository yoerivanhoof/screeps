import {HarvesterCreep} from "../../Types/HarvesterCreep";
import {AbstractCollectingState} from "../AbstractCollectingState";
import {HarvesterStoreEnergyState} from "./HarvesterStoreEnergyState";

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
