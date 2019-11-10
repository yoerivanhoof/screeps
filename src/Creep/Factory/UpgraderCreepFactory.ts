import {CreepState} from "../State/CreepState";
import {UpgraderCollectingState} from "../State/Upgrader/UpgraderCollectingState";
import {UpgraderUpgradingState} from "../State/Upgrader/UpgraderUpgradingState";
import {BaseCreep} from "../Types/BaseCreep";
import {UpgraderCreep} from "../Types/UpgraderCreep";
import {AbstractCreepFactory} from "./AbstractCreepFactory";

export class UpgraderCreepFactory extends AbstractCreepFactory {
  public factoryInitialize(creep: Creep): BaseCreep {
    if(creep.memory.state){
      const states: {[state:string]: CreepState} = {
        'UpgraderCollectingState': new UpgraderCollectingState(),
        'UpgraderUpgradingState': new UpgraderUpgradingState()
      };
      return new UpgraderCreep(creep, states[creep.memory.state]);
    }
    return new UpgraderCreep(creep, new UpgraderUpgradingState());
  }

  public factorySpawn(spawn: string): boolean {
    if (Game.spawns[spawn].room.energyCapacityAvailable < 400) {
      return Game.spawns[spawn].spawnCreep(UpgraderCreep.bodySmall, `Upgrader: ${Game.time}`, {memory: {role: 'upgrader'}}) === 0
    } else {
      return Game.spawns[spawn].spawnCreep(UpgraderCreep.body, `Upgrader: ${Game.time}`, {memory: {role: 'upgrader'}}) === 0;
    }
  }
}
