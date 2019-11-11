import { ErrorMapper } from "utils/ErrorMapper";
import {BaseCreep} from "./Creep/Types/BaseCreep";
import {GuardCreepFactory} from "./Creep/Factory/GuardCreepFactory";
import {BuilderCreepFactory} from "./Creep/Factory/BuilderCreepFactory";
import {HarvesterCreepFactory} from "./Creep/Factory/HarvesterCreepFactory";
import {ScoutCreepFactory} from "./Creep/Factory/ScoutCreepFactory";
import {UpgraderCreepFactory} from "./Creep/Factory/UpgraderCreepFactory";
import {AbstractCreepFactory} from "./Creep/Factory/AbstractCreepFactory";
import {ClaimCreepFactory} from "./Creep/Factory/ClaimCreepFactory";
import {BaseRoom} from "./Room/Types/BaseRoom";
import {AbstractRoomFactory} from "./Room/Factory/AbstractRoomFactory";
import {StartRoomFactory} from "./Room/Factory/StartRoomFactory";

const creepFactories: { [type: string]: AbstractCreepFactory; } = {
  builder: new BuilderCreepFactory(),
  harvester: new HarvesterCreepFactory(),
  upgrader: new UpgraderCreepFactory(),
  guard: new GuardCreepFactory(),
  scout: new ScoutCreepFactory(),
  claim: new ClaimCreepFactory()
};

const roomFactories: {[type:string]: AbstractRoomFactory; } = {
  startRoom: new StartRoomFactory()
};

let creeps: BaseCreep[] = [];
for (let creepId in Memory.creeps) {
  if(Memory.creeps[creepId].role){
    creeps.push(creepFactories[Memory.creeps[creepId].role].initialize(Game.creeps[creepId]))
  }else{
    // todo reassign creep code.
  }
}

let rooms: BaseRoom[] = [];
for (let roomId in Memory.rooms) {
  if(Memory.rooms[roomId].role){
    rooms.push(roomFactories[Memory.rooms[roomId].role].initialize(Game.rooms[roomId]))
  }else{
    // todo reasign room code.
  }
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time} Current creeps: ${creeps.length}`);

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
      creeps.forEach(creep=>{
        if(!creep.creep){
          creeps.splice(creeps.indexOf(creep),1);
        }
      });
    }
  }

  rooms.forEach(room=>{
    room.work();
  });

  creeps.forEach(creep=>{
    creep.work();
  });
});
