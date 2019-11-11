import {StateMachine} from "../../Abstract/StateMachine/StateMachine";
import {CreepState} from "../State/CreepState";

export abstract class BaseCreep {
  private statemachine: StateMachine<BaseCreep> = new StateMachine<BaseCreep>(this);
  public static creepName = 'abstract';
  public static body: string[] = [MOVE];

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
