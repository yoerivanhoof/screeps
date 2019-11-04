import {ErrorMapper} from "utils/ErrorMapper";
import {CoreCreep} from "./core.creep";
import {RoleBuilder} from './role.builder';
import {RoleHarvester} from "./role.harvester";
import {RoleUpgrader} from "./role.upgrader";

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
  const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
  const builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
  const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');

  console.log(`Current creeps. Harvesters: ${harvesters.length}. Builders: ${builders.length}. Upgraders: ${upgraders.length}`);

  if (harvesters.length < 2) {
    CoreCreep.spawnCreep('Spawn1', 'harvester');
  }
  if (builders.length < 3) {
    CoreCreep.spawnCreep('Spawn1', 'builder');
  }
  if (upgraders.length < 3) {
    CoreCreep.spawnCreep('Spawn1', 'upgrader');
  }
  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    if (creep.memory.role === 'harvester') {
      RoleHarvester.run(creep);
    }
    if (creep.memory.role === 'upgrader') {
      RoleUpgrader.run(creep);
    }
    if (creep.memory.role === 'builder') {
      RoleBuilder.run(creep);
    }
  }

});
