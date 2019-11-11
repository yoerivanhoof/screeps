import {State} from "../../Abstract/StateMachine/State";
import {BaseRoom} from "../Types/BaseRoom";

export abstract class RoomState implements State<BaseRoom>{
  abstract enter(object: BaseRoom): void;

  abstract execute(object: BaseRoom): void;

  abstract exit(object: BaseRoom): void;

}
