import {CreepState} from "../State/CreepState";
import {HarvesterCollectingState} from "../State/Harvester/HarvesterCollectingState";
import {HarvesterStoreEnergyState} from "../State/Harvester/HarvesterStoreEnergyState";
import {BaseCreep} from "../Types/BaseCreep";
import {HarvesterCreep} from "../Types/HarvesterCreep";
import {AbstractCreepFactory} from "./AbstractCreepFactory";

export class HarvesterCreepFactory extends AbstractCreepFactory {
  public factoryMethod(creep: Creep): BaseCreep {
    if(creep.memory.state){
      const states: {[state:string]: CreepState} = {
        'HarvesterCollectingState': new HarvesterCollectingState(),
        'HarvesterStoreEnergyState': new HarvesterStoreEnergyState()
      };
      return new HarvesterCreep(creep, states[creep.memory.state]);
    }
    return new HarvesterCreep(creep, new HarvesterCollectingState());
  }
}
