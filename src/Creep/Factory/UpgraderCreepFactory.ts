import {BuilderCollectingState} from "../State/Builder/BuilderCollectingState";
import {BaseCreep} from "../Types/BaseCreep";
import {UpgraderCreep} from "../Types/UpgraderCreep";
import {AbstractCreepFactory} from "./AbstractCreepFactory";
import {UpgraderUpgradingState} from "../State/Upgrader/UpgraderUpgradingState";
import {CreepState} from "../State/CreepState";
import {HarvesterCollectingState} from "../State/Harvester/HarvesterCollectingState";
import {HarvesterStoreEnergyState} from "../State/Harvester/HarvesterStoreEnergyState";
import {HarvesterCreep} from "../Types/HarvesterCreep";
import {UpgraderCollectingState} from "../State/Upgrader/UpgraderCollectingState";

export class UpgraderCreepFactory extends AbstractCreepFactory {
  public factoryMethod(creep: Creep): BaseCreep {
    if(creep.memory.state){
      const states: {[state:string]: CreepState} = {
        'UpgraderCollectingState': new UpgraderCollectingState(),
        'UpgraderUpgradingState': new UpgraderUpgradingState()
      };
      return new UpgraderCreep(creep, states[creep.memory.state]);
    }
    return new UpgraderCreep(creep, new UpgraderUpgradingState());
  }
}
