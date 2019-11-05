import {AbstractCreepFactory} from "./AbstractCreepFactory";
import {BaseCreep} from "../Types/BaseCreep";
import {BuilderCreep} from "../Types/BuilderCreep";
import {GuardCreep} from "../Types/GuardCreep";
import {HarvesterCreep} from "../Types/HarvesterCreep";

export class HarvesterCreepFactory extends AbstractCreepFactory{
  factoryMethod(creep: Creep): BaseCreep {
    return new HarvesterCreep(creep);
  }
}
