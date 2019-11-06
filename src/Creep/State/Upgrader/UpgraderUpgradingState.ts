import {CreepState} from "../CreepState";
import {UpgraderCreep} from "../../Types/UpgraderCreep";
import {UpgraderCollectingState} from "./UpgraderCollectingState";

export class UpgraderUpgradingState implements CreepState {
  enter(creep: UpgraderCreep): void {
    creep.creep.say("Upgrading")
  }

  execute(creep: UpgraderCreep): void {
    if (creep.creep.upgradeController(creep.creep.room.controller as StructureController) === ERR_NOT_IN_RANGE) {
      creep.creep.moveTo((creep.creep.room.controller as StructureController).pos, { visualizePathStyle: { stroke: '#ffffff' } });
    }

    if (creep.creep.carry.energy === 0) {
      creep.state = new UpgraderCollectingState();
    }
  }

  exit(creep: UpgraderCreep): void {

  }

}
