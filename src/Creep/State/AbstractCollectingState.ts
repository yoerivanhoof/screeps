import {CreepState} from "./CreepState";
import {BaseCreep} from "../Types/BaseCreep";

export abstract class AbstractCollectingState implements CreepState {

  public enter(creep: BaseCreep): void {
    creep.creep.say('Collecting');
    this.getPathToSource(creep);
  }

  private getPathToSource(creep: BaseCreep) {
    let sources = creep.creep.room.find(FIND_SOURCES);

    let closest = 500000;
    sources.forEach(source => {
      const path = PathFinder.search(creep.creep.pos, source.pos);
      if (path.cost < closest) {
        const pos = path.path[path.path.length - 1];
        if (!PathFinder.search(creep.creep.pos, pos).incomplete) {
          closest = path.cost;
          creep.creep.memory.sourceId = source.id;
        }
      }
    });
  }

  public execute(creep: BaseCreep): void {
    if (creep.creep.harvest(Game.getObjectById(creep.creep.memory.sourceId) as Source) === ERR_NOT_IN_RANGE) {
      let moveResult = creep.creep.moveTo((Game.getObjectById(creep.creep.memory.sourceId) as Source),
        {
          noPathFinding: true, visualizePathStyle: {fill: 'transparent', stroke: '#fff'}
        });
      if (moveResult == -5) {
        creep.creep.moveTo((Game.getObjectById(creep.creep.memory.sourceId) as Source), {
          visualizePathStyle: {fill: 'transparent', stroke: '#f00'}
        });
      }else if (moveResult == -2) {
        this.getPathToSource(creep);
      } else if (moveResult !== 0) {
        console.log(`${creep.creep.name}: could not move. ${moveResult}`);
      }
    }
  }

  abstract exit(creep: BaseCreep): void;

}
