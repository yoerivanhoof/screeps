import {BaseCreep} from "./BaseCreep";

export class ClaimCreep extends BaseCreep {
  public static creepName = 'claim';
  public static body = [CLAIM, CLAIM, MOVE, MOVE]
}
