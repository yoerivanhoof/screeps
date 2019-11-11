import {AbstractRoomFactory} from "./AbstractRoomFactory";
import {BaseRoom} from "../Types/BaseRoom";
import {StartRoom} from "../Types/StartRoom";
import {StartRoomMK1State} from "../State/StartRoom/StartRoomMK1State";
import {RoomState} from "../State/RoomState";

export class StartRoomFactory extends AbstractRoomFactory {
  factoryInitialize(room: Room): BaseRoom {
    if (room.memory.state) {
      const states: { [state: string]: RoomState } = {
        'StartRoomMK1State': new StartRoomMK1State()
      };
      return new StartRoom(room, states[room.memory.state]);
    }
    return new StartRoom(room, new StartRoomMK1State());
  }

}
