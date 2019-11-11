import {CreepState} from "../State/CreepState";
import {UpgraderCollectingState} from "../State/Upgrader/UpgraderCollectingState";
import {UpgraderUpgradingState} from "../State/Upgrader/UpgraderUpgradingState";
import {BaseCreep} from "../Types/BaseCreep";
import {UpgraderCreep} from "../Types/UpgraderCreep";
import {AbstractCreepFactory} from "./AbstractCreepFactory";
import {BaseRoom} from "../../Room/Types/BaseRoom";

export class UpgraderCreepFactory extends AbstractCreepFactory {
  public static creepType = 'upgrader';
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

  public factorySpawn(room:BaseRoom): boolean {
    if (Game.spawns[room.room.name].room.energyCapacityAvailable < 400) {
      return Game.spawns[room.room.name].spawnCreep(UpgraderCreep.bodySmall, `Upgrader: ${Game.time}`, {memory: {role: 'upgrader', room: Game.spawns[room.room.name].room.name}}) === 0
    } else {
      return Game.spawns[room.room.name].spawnCreep(UpgraderCreep.body, `Upgrader: ${Game.time}`, {memory: {role: 'upgrader', room: Game.spawns[room.room.name].room.name}}) === 0;
    }
  }
}
