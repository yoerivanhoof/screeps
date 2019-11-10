import {CreepState} from "../State/CreepState";
import {HarvesterCollectingState} from "../State/Harvester/HarvesterCollectingState";
import {HarvesterStoreEnergyState} from "../State/Harvester/HarvesterStoreEnergyState";
import {BaseCreep} from "../Types/BaseCreep";
import {HarvesterCreep} from "../Types/HarvesterCreep";
import {AbstractCreepFactory} from "./AbstractCreepFactory";
import {GuardCreep} from "../Types/GuardCreep";

export class HarvesterCreepFactory extends AbstractCreepFactory {
  public factoryInitialize(creep: Creep): BaseCreep {
    if(creep.memory.state){
      const states: {[state:string]: CreepState} = {
        'HarvesterCollectingState': new HarvesterCollectingState(),
        'HarvesterStoreEnergyState': new HarvesterStoreEnergyState()
      };
      return new HarvesterCreep(creep, states[creep.memory.state]);
    }
    return new HarvesterCreep(creep, new HarvesterCollectingState());
  }

  public factorySpawn(spawn: string): boolean {
    // console.log(`Spawn: ${spawn} energycapacity: ${Game.spawns[spawn].room.energyCapacityAvailable}`);
    if(Game.spawns[spawn].room.energyAvailable < 400){
      return Game.spawns[spawn].spawnCreep(HarvesterCreep.bodySmall, `Harvester: ${Game.time}`, {memory: {role: 'harvester'}}) === 0
    }else {
      return Game.spawns[spawn].spawnCreep(HarvesterCreep.body, `Harvester: ${Game.time}`, {memory: {role: 'harvester'}}) === 0;
    }
  }
}
