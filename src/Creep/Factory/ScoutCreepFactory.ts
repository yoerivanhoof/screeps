import {CreepState} from "../State/CreepState";
import {ScoutScoutingState} from "../State/ScoutCreep/ScoutScoutingState";
import {BaseCreep} from "../Types/BaseCreep";
import {ScoutCreep} from "../Types/ScoutCreep";
import {AbstractCreepFactory} from "./AbstractCreepFactory";

export class ScoutCreepFactory extends AbstractCreepFactory {
  public factoryInitialize(creep: Creep): BaseCreep {
    if(creep.memory.state){
      const states: {[state:string]: CreepState} = {
        'ScoutScoutingState': new ScoutScoutingState()
      };
      return new ScoutCreep(creep, states[creep.memory.state]);
    }
    return new ScoutCreep(creep, new ScoutScoutingState());
  }

  public factorySpawn(spawn: string): boolean {
    return Game.spawns[spawn].spawnCreep(ScoutCreep.body, `Scout: ${Game.time}`, {memory:{role:'scout'}}) === 0;
  }
}
