import {CreepState} from "../State/CreepState";
import {ScoutScoutingState} from "../State/ScoutCreep/ScoutScoutingState";
import {BaseCreep} from "../Types/BaseCreep";
import {ScoutCreep} from "../Types/ScoutCreep";
import {AbstractCreepFactory} from "./AbstractCreepFactory";
import {BaseRoom} from "../../Room/Types/BaseRoom";

export class ScoutCreepFactory extends AbstractCreepFactory {
  public static creepType = 'scout';
  public factoryInitialize(creep: Creep): BaseCreep {
    if(creep.memory.state){
      const states: {[state:string]: CreepState} = {
        'ScoutScoutingState': new ScoutScoutingState()
      };
      return new ScoutCreep(creep, states[creep.memory.state]);
    }
    return new ScoutCreep(creep, new ScoutScoutingState());
  }

  public factorySpawn(room:BaseRoom): boolean {
    if(Game.flags.scout) {
      return Game.spawns[room.room.name].spawnCreep(ScoutCreep.body, `Scout: ${Game.time}`, {memory: {role: 'scout', room: Game.spawns[room.room.name].room.name}}) === 0;
    }else{
      return false;
    }
  }
}
