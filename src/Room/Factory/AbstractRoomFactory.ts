import {BaseRoom} from "../Types/BaseRoom";

export abstract class AbstractRoomFactory {
  public abstract factoryInitialize(room: Room): BaseRoom;

  public initialize(room: Room): BaseRoom {
    return this.factoryInitialize(room);
  }

}
