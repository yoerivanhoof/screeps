import {BaseCreep} from "./BaseCreep";

export class GuardCreep extends BaseCreep{
  public static creepName = 'guard';
  public static body = [ATTACK, ATTACK, ATTACK, ATTACK, TOUGH, TOUGH, TOUGH, MOVE, MOVE];

}
