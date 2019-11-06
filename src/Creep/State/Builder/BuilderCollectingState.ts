import {CoreFunc} from "../../../coreFunc";
import {BaseCreep} from "../../Types/BaseCreep";
import {BuilderBuildState} from "./BuilderBuildState";
import {CreepState} from "../CreepState";
import {AbstractCollectingState} from "../AbstractCollectingState";
import {HarvesterStoreEnergyState} from "../Harvester/HarvesterStoreEnergyState";
import {BuilderCreep} from "../../Types/BuilderCreep";

export class BuilderCollectingState extends AbstractCollectingState {

  public execute(creep: BuilderCreep): void {
    super.execute(creep);
    if(creep.creep.carry.energy === creep.creep.carryCapacity){
      creep.state = new BuilderBuildState();
    }
  }

  public exit(creep: BuilderCreep): void {
    // todo
  }

}
