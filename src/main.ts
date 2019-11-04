import {ErrorMapper} from "utils/ErrorMapper";
import {CoreFunc} from "./coreFunc";
import {Role} from "./role";
import {RoleBuilder} from './role.builder';
import {RoleGuard} from "./role.guard";
import {RoleHarvester} from "./role.harvester";
import {RoleUpgrader} from "./role.upgrader";

const roles: { [role: string]: Role; } = {
  'builder': new RoleBuilder(),
  'harvester': new RoleHarvester(),
  'upgrader': new RoleUpgrader(),
  'guard': new RoleGuard()
};


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
  const guards = _.filter(Game.creeps, (creep) => creep.memory.role === 'guard');

  console.log(`Current creeps. Harvesters: ${harvesters.length}. Builders: ${builders.length}. Upgraders: ${upgraders.length}`);

  if (harvesters.length < 2) {
    CoreFunc.spawnCreep('Spawn1', 'harvester');
  }
  if (builders.length < 3) {
    CoreFunc.spawnCreep('Spawn1', 'builder');
  }
  if (upgraders.length < 3) {
    CoreFunc.spawnCreep('Spawn1', 'upgrader');
  }
  if (guards.length < 2) {
    CoreFunc.spawnCreep('Spawn1', 'guard');
  }



  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    roles[creep.memory.role].run(creep);
  }

});
