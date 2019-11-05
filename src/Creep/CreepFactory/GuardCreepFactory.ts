import {AbstractCreepFactory} from "./AbstractCreepFactory";
import {BaseCreep} from "../Types/BaseCreep";
import {BuilderCreep} from "../Types/BuilderCreep";
import {GuardCreep} from "../Types/GuardCreep";

export class GuardCreepFactory extends AbstractCreepFactory{
  factoryMethod(creep: Creep): BaseCreep {
    return new GuardCreep(creep);
  }
}
