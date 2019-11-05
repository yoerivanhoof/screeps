import {BuilderCollectingState} from "../State/BuilderCollectingState";
import {BaseCreep} from "../Types/BaseCreep";
import {UpgraderCreep} from "../Types/UpgraderCreep";
import {AbstractCreepFactory} from "./AbstractCreepFactory";

export class UpgraderCreepFactory extends AbstractCreepFactory {
  public factoryMethod(creep: Creep): BaseCreep {
    return new UpgraderCreep(creep, new BuilderCollectingState());
  }
}
