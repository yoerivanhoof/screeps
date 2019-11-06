import {ErrorMapper} from "utils/ErrorMapper";
import {CoreFunc} from "./coreFunc";
import {AbstractCreepFactory} from "./Creep/Factory/AbstractCreepFactory";
import {BuilderCreepFactory} from "./Creep/Factory/BuilderCreepFactory";
import {GuardCreepFactory} from "./Creep/Factory/GuardCreepFactory";
import {HarvesterCreepFactory} from "./Creep/Factory/HarvesterCreepFactory";
import {UpgraderCreepFactory} from "./Creep/Factory/UpgraderCreepFactory";
import {BaseCreep} from "./Creep/Types/BaseCreep";
import * as profiler from "screeps-profiler";


const factories: { [type: string]: AbstractCreepFactory; } = {
  'builder': new BuilderCreepFactory(),
  'harvester': new HarvesterCreepFactory(),
  'upgrader': new UpgraderCreepFactory(),
  'guard': new GuardCreepFactory()
};

const creeps: BaseCreep[] = [];

const population: { [role: string]: number } = {
  'builder': 2,
  'harvester': 2,
  'upgrader': 2,
  'guard': 0
};

for (const name in Game.creeps) {
  const creep = Game.creeps[name];

  creep.work = () => {
    creeps.push(factories[creep.memory.role].build(creep));
  }

}

profiler.enable();
// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  profiler.wrap(function () {

    // console.log(`Current game tick is ${Game.time}`);

    // Automatically delete memory of missing creeps
    for (const name in Memory.creeps) {
      if (!(name in Game.creeps)) {
        delete Memory.creeps[name];
        if (creeps.map(cr => cr.creep.name).indexOf(name) !== -1) {
          creeps.splice(creeps.map(cr => cr.creep.name).indexOf(name), 1);
        }
      }
    }

    creeps.forEach(creep => {
      if (!creep.creep) {
        creeps.splice(creeps.indexOf(creep), 1);
      }
    });

    const creepcount: { [type: string]: number } = {};

    for (const populationKey in population) {
      const populationCount = _.filter(Game.creeps, (creep) => creep.memory.role === populationKey);
      creepcount[populationKey] = populationCount.length;

      if (populationCount.length < population[populationKey]) {

        CoreFunc.spawnCreep('Spawn1', populationKey)
      }
    }
    // console.log(`Current: Harvesters: ${creepcount.harvester}. Builders: ${creepcount.builder}. Upgraders: ${creepcount.upgrader}.`);


    for (const name in Game.creeps) {
      const creep = Game.creeps[name];
      if (creeps.map(cr => cr.creep.name).indexOf(creep.name) === -1) {
        creeps.push(factories[creep.memory.role].build(creep));
      }
    }

    creeps.forEach(creep => {
      if (creep.creep && creep.creep.name in Game.creeps) {
        creep.work();
      }
    });
  })
});
