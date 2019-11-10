import {BuilderCreep} from "../../Types/BuilderCreep";
import {AbstractCollectingState} from "../AbstractCollectingState";
import {BuilderBuildState} from "./BuilderBuildState";

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
