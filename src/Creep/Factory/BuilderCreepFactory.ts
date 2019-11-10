import {BuilderBuildState} from "../State/Builder/BuilderBuildState";
import {BuilderCollectingState} from "../State/Builder/BuilderCollectingState";
import {CreepState} from "../State/CreepState";
import {BaseCreep} from "../Types/BaseCreep";
import {BuilderCreep} from "../Types/BuilderCreep";
import {AbstractCreepFactory} from "./AbstractCreepFactory";

export class BuilderCreepFactory extends AbstractCreepFactory {
  public factoryMethod(creep: Creep): BaseCreep {
    if(creep.memory.state){
      const states: {[state:string]: CreepState} = {
        'BuilderBuildState': new BuilderBuildState(),
        'BuilderCollectingState': new BuilderCollectingState()
      };
      return new BuilderCreep(creep, states[creep.memory.state]);
    }
    return new BuilderCreep(creep, new BuilderBuildState());
  }
}
