import {BuilderCollectingState} from "../State/BuilderCollectingState";
import {BaseCreep} from "../Types/BaseCreep";
import {GuardCreep} from "../Types/GuardCreep";
import {AbstractCreepFactory} from "./AbstractCreepFactory";

export class GuardCreepFactory extends AbstractCreepFactory {
  public factoryMethod(creep: Creep): BaseCreep {
    return new GuardCreep(creep, new BuilderCollectingState());
  }
}
