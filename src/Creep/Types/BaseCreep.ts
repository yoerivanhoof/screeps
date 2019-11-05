import {State} from "../State/State";
import {CoreFunc} from "../../coreFunc";
import {BuilderBuildState} from "../State/BuilderBuildState";

export abstract class BaseCreep {
  private _state: State;

  get state(): State{
    return this._state;
  }

  set state(state: State){
    this._state.exit(this);
    this._state = state;
    this._state.enter(this);
  }

  get creep(): Creep{
    return Game.creeps[this._creep.name];
  }
  private _creep: Creep;

  public constructor(creep: Creep, state: State) {
    this._creep = creep;
    this._state = state;
  }

  public work():void {
    this._state.execute(this)
  };

  public collectResource(){
    const sources = this.creep.room.find(FIND_SOURCES);
    const minIndex = CoreFunc.findClosesSource(sources, this.creep.pos);
    if (this.creep.harvest(sources[minIndex]) === ERR_NOT_IN_RANGE) {
      this.creep.moveTo(sources[minIndex], {visualizePathStyle: {stroke: '#ffaa00'}});
    }
  }
}
