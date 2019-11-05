import {AbstractCreepFactory} from "./AbstractCreepFactory";
import {BaseCreep} from "../Types/BaseCreep";
import {BuilderCreep} from "../Types/BuilderCreep";

export class BuilderCreepFactory extends AbstractCreepFactory{
  factoryMethod(creep: Creep): BaseCreep {
    return new BuilderCreep(creep);
  }
}
