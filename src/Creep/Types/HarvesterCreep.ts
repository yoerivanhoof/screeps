import {BaseCreep} from "./BaseCreep";

export class HarvesterCreep extends BaseCreep {
  public static creepName = 'harvester';
  public static bodySmall = [WORK,CARRY,MOVE];
  public static body = [WORK, WORK, CARRY, CARRY, MOVE, MOVE];
  public static bodyBig = [];
}
