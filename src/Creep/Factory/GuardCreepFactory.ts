import {BaseCreep} from "../Types/BaseCreep";
import {GuardCreep} from "../Types/GuardCreep";
import {AbstractCreepFactory} from "./AbstractCreepFactory";
import {GuardPatrolState} from "../State/Guard/GuardPatrolState";
import {CreepState} from "../State/CreepState";
import {BuilderBuildState} from "../State/Builder/BuilderBuildState";
import {BuilderCollectingState} from "../State/Builder/BuilderCollectingState";
import {BuilderCreep} from "../Types/BuilderCreep";

export class GuardCreepFactory extends AbstractCreepFactory {
  public factoryInitialize(creep: Creep): BaseCreep {
    if (creep.memory.state) {
      const states: { [state: string]: CreepState } = {
        'GuardPatrolState': new GuardPatrolState()
      };
      return new GuardCreep(creep, states[creep.memory.state]);
    }
    return new GuardCreep(creep, new GuardPatrolState());

  }

  public factorySpawn(spawn: string): boolean {
    return Game.spawns[spawn].spawnCreep(GuardCreep.body, `Guard: ${Game.time}`, {memory:{role:'guard'}}) === 0;
  }
}
