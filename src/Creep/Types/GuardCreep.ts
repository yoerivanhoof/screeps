import {CoreFunc} from "../../coreFunc";
import {BaseCreep} from "./BaseCreep";

export class GuardCreep extends BaseCreep{
  public static body = [ATTACK, ATTACK, ATTACK, ATTACK, TOUGH, TOUGH, TOUGH, MOVE, MOVE];

}
