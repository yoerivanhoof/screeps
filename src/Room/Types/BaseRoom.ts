import {StateMachine} from "../../Abstract/StateMachine/StateMachine";
import {CreepState} from "../../Creep/State/CreepState";
import {RoomState} from "../State/RoomState";

export class BaseRoom {
  private statemachine: StateMachine<BaseRoom> = new StateMachine<BaseRoom>(this);

  // public static body: string[] = [MOVE]; todo configuation for roomtype?

  public revertToPreviousState(){
    this.statemachine.revertToPreviousState()
  }

  set state(state: RoomState){
    this.statemachine.state = state;
  }

  get room(): Room{
    return Game.rooms[this._room.name];
  }

  get spawn(): StructureSpawn[]{
    return Game.rooms[this._room.name].find(FIND_MY_SPAWNS)
  }
  private _room: Room;

  public constructor(room: Room, state: RoomState) {
    this._room = room;
    this.room.memory.state = state.constructor.name;
    this.statemachine.state = state;
  }

  public work():void {
    this.statemachine.execute();
  };
}
