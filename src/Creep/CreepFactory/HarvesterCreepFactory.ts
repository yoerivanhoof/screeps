import {HarvesterCollectingState} from "../State/HarvesterCollectingState";
import {BaseCreep} from "../Types/BaseCreep";
import {HarvesterCreep} from "../Types/HarvesterCreep";
import {AbstractCreepFactory} from "./AbstractCreepFactory";

export class HarvesterCreepFactory extends AbstractCreepFactory {
  public factoryMethod(creep: Creep): BaseCreep {
    return new HarvesterCreep(creep, new HarvesterCollectingState());
  }
}
