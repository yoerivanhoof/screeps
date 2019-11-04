import {ErrorMapper} from "utils/ErrorMapper";
import {roleBuilder} from './role.builder';
import {roleHarvester} from "./role.harvester";
import {roleUpgrader} from "./role.upgrader";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }

  var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
  var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
  var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');


  if(harvesters.length < 2) {
    var newName = 'Harvester ' + Game.time;
    // @ts-ignore
    Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'harvester'}});
  }

  if(builders.length < 2) {
    var newName = 'Builder ' + Game.time;
    // @ts-ignore
    Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'builder'}});
  }

  if(upgraders.length < 2) {
    var newName = 'Upgrader ' + Game.time;
    // @ts-ignore
    Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'upgrader'}});
  }

  for(var name in Game.creeps) {
    var creep = Game.creeps[name];
    if(creep.memory.role == 'harvester') {
      roleHarvester.run(creep);
    }
    if(creep.memory.role == 'upgrader') {
      roleUpgrader.run(creep);
    }
    if(creep.memory.role == 'builder') {
      roleBuilder.run(creep);
    }
  }

});
