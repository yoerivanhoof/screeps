import {UpgraderCreep} from "../../Types/UpgraderCreep";
import {AbstractCollectingState} from "../AbstractCollectingState";
import {UpgraderUpgradingState} from "./UpgraderUpgradingState";

export class UpgraderCollectingState extends AbstractCollectingState {

  public execute(creep: UpgraderCreep): void {
    super.execute(creep);

    if (creep.creep.carry.energy === creep.creep.carryCapacity) {
      creep.state = new UpgraderUpgradingState();
    }
  }

  public exit(creep: UpgraderCreep): void {
    // todo
  }

}
