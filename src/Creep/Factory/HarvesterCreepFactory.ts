import {CreepState} from "../State/CreepState";
import {HarvesterCollectingState} from "../State/Harvester/HarvesterCollectingState";
import {HarvesterStoreEnergyState} from "../State/Harvester/HarvesterStoreEnergyState";
import {BaseCreep} from "../Types/BaseCreep";
import {HarvesterCreep} from "../Types/HarvesterCreep";
import {AbstractCreepFactory} from "./AbstractCreepFactory";
import {GuardCreep} from "../Types/GuardCreep";
import {BaseRoom} from "../../Room/Types/BaseRoom";

export class HarvesterCreepFactory extends AbstractCreepFactory {
  public static creepType = 'harvester';
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

  public factorySpawn(room:BaseRoom): boolean {
    // console.log(`Spawn: ${spawn} energycapacity: ${Game.spawns[spawn].room.energyCapacityAvailable}`);
    if(Game.spawns[room.room.name].room.energyAvailable < 400){
      return Game.spawns[room.room.name].spawnCreep(HarvesterCreep.bodySmall, `Harvester: ${Game.time}`, {memory: {role: 'harvester', room: Game.spawns[room.room.name].room.name}}) === 0
    }else {
      return Game.spawns[room.room.name].spawnCreep(HarvesterCreep.body, `Harvester: ${Game.time}`, {memory: {role: 'harvester', room: Game.spawns[room.room.name].room.name}}) === 0;
    }
  }
}
