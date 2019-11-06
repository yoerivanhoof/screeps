import {BuilderBuildState} from "../State/Builder/BuilderBuildState";
import {BaseCreep} from "../Types/BaseCreep";
import {BuilderCreep} from "../Types/BuilderCreep";
import {AbstractCreepFactory} from "./AbstractCreepFactory";
import {CreepState} from "../State/CreepState";
import {HarvesterCollectingState} from "../State/Harvester/HarvesterCollectingState";
import {HarvesterStoreEnergyState} from "../State/Harvester/HarvesterStoreEnergyState";
import {HarvesterCreep} from "../Types/HarvesterCreep";
import {BuilderCollectingState} from "../State/Builder/BuilderCollectingState";

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
