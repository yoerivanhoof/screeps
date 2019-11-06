import {CoreFunc} from "../../coreFunc";
import {BaseCreep} from "../Types/BaseCreep";
import {BuilderBuildState} from "./BuilderBuildState";
import {State} from "./State";
import {AbstractCollectingState} from "./AbstractCollectingState";
import {HarvesterStoreEnergyState} from "./HarvesterStoreEnergyState";

export class BuilderCollectingState extends AbstractCollectingState {

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
