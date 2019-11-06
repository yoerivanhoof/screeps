import {CreepState} from "../State/CreepState";
import {CoreFunc} from "../../coreFunc";
import {BuilderBuildState} from "../State/Builder/BuilderBuildState";
import {StateMachine} from "../../StateMachine/StateMachine";

export abstract class BaseCreep {
  private statemachine: StateMachine<BaseCreep> = new StateMachine<BaseCreep>(this);

  public revertToPreviousState(){
    this.statemachine.revertToPreviousState()
  }

  set state(state: CreepState){
    this.statemachine.state = state;
  }

  get creep(): Creep{
    return Game.creeps[this._creep.name];
  }
  private _creep: Creep;

  public constructor(creep: Creep, state: CreepState) {
    this._creep = creep;
    this.creep.memory.state = state.constructor.name;
    this.statemachine.state = state;
  }

  public work():void {
    this.statemachine.execute();
  };
}
