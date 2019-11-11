import {BaseCreep} from "./BaseCreep";

export class UpgraderCreep extends BaseCreep {
  public static creepName = 'upgrader';
  public static bodySmall = [WORK,CARRY,MOVE];
  public static body = [WORK, WORK, CARRY, CARRY, MOVE, MOVE]
}
