import {BuilderBuildState} from "../State/BuilderBuildState";
import {BaseCreep} from "../Types/BaseCreep";
import {BuilderCreep} from "../Types/BuilderCreep";
import {AbstractCreepFactory} from "./AbstractCreepFactory";

export class BuilderCreepFactory extends AbstractCreepFactory {
  public factoryMethod(creep: Creep): BaseCreep {
    return new BuilderCreep(creep, new BuilderBuildState());
  }
}
