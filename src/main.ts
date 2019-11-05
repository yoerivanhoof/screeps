import {ErrorMapper} from "utils/ErrorMapper";
import {CoreFunc} from "./coreFunc";
import {AbstractCreepFactory} from "./Creep/CreepFactory/AbstractCreepFactory";
import {HarvesterCreepFactory} from "./Creep/CreepFactory/HarvesterCreepFactory";
import {BuilderCreepFactory} from "./Creep/CreepFactory/BuilderCreepFactory";
import {UpgraderCreepFactory} from "./Creep/CreepFactory/UpgraderCreepFactory";
import {GuardCreepFactory} from "./Creep/CreepFactory/GuardCreepFactory";
import {BaseCreep} from "./Creep/Types/BaseCreep";
import screeps from "rollup-plugin-screeps/dist/src/rollup-plugin-screeps";

const factories: { [type: string]: AbstractCreepFactory; } = {
  'builder': new BuilderCreepFactory(),
  'harvester': new HarvesterCreepFactory(),
  'upgrader': new UpgraderCreepFactory(),
  'guard': new GuardCreepFactory()
};

const creeps: BaseCreep[] = [];

const population: { [role: string]: number } = {
  'builder': 0,
  'harvester': 1,
  'upgrader': 0,
  'guard': 0
};

for (const name in Game.creeps) {
  const creep = Game.creeps[name];

    // @ts-ignore
    creep.work = function () {
      creeps.push(factories[creep.memory.role].build(creep));
    }

}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log('initialized creeps: '+creeps.length);
  // console.log(t++);
  // console.log(`Current game tick is ${Game.time}`);

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
      if(creeps.map(cr=>cr.creep.name).indexOf(name) !== -1){
        creeps.splice(creeps.map(cr=>cr.creep.name).indexOf(name),1);
      }
    }
  }

  for (let populationKey in population) {
    const populationCount = _.filter(Game.creeps, (creep) => creep.memory.role === populationKey);
    // console.log(`Current ${populationKey}: ${populationCount.length}`);
    if (populationCount.length < population[populationKey]) {
      CoreFunc.spawnCreep('Spawn1', populationKey)
    }
  }

  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    if (creeps.map(cr=>cr.creep.name).indexOf(creep.name) === -1){
      creeps.push(factories[creep.memory.role].build(creep));
    }
  }

  creeps.forEach(creep=>{
    creep.work();
  });
});
