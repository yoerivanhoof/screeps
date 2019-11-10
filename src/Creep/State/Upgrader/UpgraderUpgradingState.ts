import {UpgraderCreep} from "../../Types/UpgraderCreep";
import {CreepState} from "../CreepState";
import {UpgraderCollectingState} from "./UpgraderCollectingState";

export class UpgraderUpgradingState implements CreepState {
  public enter(creep: UpgraderCreep): void {
    creep.creep.say("Upgrading")
  }

  public execute(creep: UpgraderCreep): void {
    if (creep.creep.upgradeController(creep.creep.room.controller as StructureController) === ERR_NOT_IN_RANGE) {
      creep.creep.moveTo((creep.creep.room.controller as StructureController).pos, { visualizePathStyle: { stroke: '#ffffff' } });
    }

    if (creep.creep.carry.energy === 0) {
      creep.state = new UpgraderCollectingState();
    }
  }

  public exit(creep: UpgraderCreep): void {
    // todo
  }

}
