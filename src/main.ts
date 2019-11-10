import * as profiler from "screeps-profiler";
import {ErrorMapper} from "utils/ErrorMapper";
import {CoreFunc} from "./coreFunc";
import {AbstractCreepFactory} from "./Creep/Factory/AbstractCreepFactory";
import {BuilderCreepFactory} from "./Creep/Factory/BuilderCreepFactory";
import {ClaimCreepFactory} from "./Creep/Factory/ClaimCreepFactory";
import {GuardCreepFactory} from "./Creep/Factory/GuardCreepFactory";
import {HarvesterCreepFactory} from "./Creep/Factory/HarvesterCreepFactory";
import {ScoutCreepFactory} from "./Creep/Factory/ScoutCreepFactory";
import {UpgraderCreepFactory} from "./Creep/Factory/UpgraderCreepFactory";
import {BaseCreep} from "./Creep/Types/BaseCreep";
import {Spawn} from "./Spawn/Spawn";


const factories: { [type: string]: AbstractCreepFactory; } = {
  'builder': new BuilderCreepFactory(),
  'harvester': new HarvesterCreepFactory(),
  'upgrader': new UpgraderCreepFactory(),
  'guard': new GuardCreepFactory(),
  'scout': new ScoutCreepFactory(),
  'claim': new ClaimCreepFactory()
};

const creeps: BaseCreep[] = [];
const spawns: Spawn[] = [];

const population: { [role: string]: number } = {
  'harvester': 5,
  'upgrader': 2,
  'builder': 2,
  'guard': 5,
  'scout': 0,
  'claim': 0
};

for (const spawnname in Game.spawns){
  const spawn = Game.spawns[spawnname];
  spawns.push(new Spawn(spawn.name));
}

for (const name in Game.creeps) {
  const creep = Game.creeps[name];
  creep.work = () => {
    creeps.push(factories[creep.memory.role].initialize(creep));
  }
}

profiler.enable();
// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  profiler.wrap(() => {

    const maxPopulation: { [role: string]: number } = {
      'harvester': population.harvester*Object.keys(Game.spawns).length,
      'upgrader': population.upgrader*Object.keys(Game.spawns).length,
      'builder': population.builder*Object.keys(Game.spawns).length,
      'guard': population.guard*Object.keys(Game.spawns).length,
      'scout': 1,
      'claim': 1
    };

    console.log(`Current game tick is ${Game.time} Current creeps: ${creeps.length}`);

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


    spawns.forEach(spawn=>{
      for (const populationKey in population) {
        const populationCount = _.filter(spawn.spawn.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role === populationKey);
        const totalPopulationCount = _.filter(Game.creeps,(creep) => creep.memory.role === populationKey);
        creepcount[populationKey] = populationCount.length;
        if (populationCount.length < population[populationKey] && totalPopulationCount.length < maxPopulation[populationKey]) {
          factories[populationKey].spawn(spawn.spawn.name);
        }
      }
    });


    for (const name in Game.creeps) {
      const creep = Game.creeps[name];
      if (creeps.map(cr => cr.creep.name).indexOf(creep.name) === -1) {
        creeps.push(factories[creep.memory.role].initialize(creep));
      }
    }

    creeps.forEach(creep => {
      if (creep.creep && creep.creep.name in Game.creeps) {
        creep.work();
      }
    });
  })
});
