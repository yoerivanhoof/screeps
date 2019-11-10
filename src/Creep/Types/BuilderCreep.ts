import {BaseCreep} from "./BaseCreep";

export class BuilderCreep extends BaseCreep{
  public static bodySmall = [WORK,CARRY,MOVE];
  public static body = [WORK, WORK, CARRY, CARRY, MOVE, MOVE];
}
