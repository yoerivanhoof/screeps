import {BuilderBuildState} from "../State/Builder/BuilderBuildState";
import {BuilderCollectingState} from "../State/Builder/BuilderCollectingState";
import {CreepState} from "../State/CreepState";
import {BaseCreep} from "../Types/BaseCreep";
import {BuilderCreep} from "../Types/BuilderCreep";
import {AbstractCreepFactory} from "./AbstractCreepFactory";
import {BaseRoom} from "../../Room/Types/BaseRoom";
import {WorkCreep} from "../Types/WorkCreep";
import {GetWorkState} from "../State/WorkCreep/GetWorkState";

export class BuilderCreepFactory extends AbstractCreepFactory {
  public static creepType = 'builder';
  public factoryInitialize(creep: Creep): BaseCreep {
    return new WorkCreep(creep, new GetWorkState());
  }

  public factorySpawn(room: BaseRoom): boolean {
    if(this.canSpawn(room)) {
      if (room.room.energyCapacityAvailable < 400) {
        return room.spawn[0].spawnCreep(BuilderCreep.bodySmall, `Builder: ${Game.time}`, {memory: {role: 'builder', room: Game.spawns[room.room.name].room.name}}) === 0
      } else {
        return Game.spawns[room.room.name].spawnCreep(BuilderCreep.body, `Builder: ${Game.time}`, {
          memory: {
            role: 'builder',
            room: Game.spawns[room.room.name].room.name
          }
        }) === 0;
      }
    }else{
      // room has no spawners
      return false;
    }
  }
}
