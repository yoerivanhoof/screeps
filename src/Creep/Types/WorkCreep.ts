import {BaseCreep} from "./BaseCreep";
import {BaseWorkOrder} from "../../WorkOrder/BaseWorkOrder";

export class WorkCreep extends BaseCreep{
  private _work: BaseWorkOrder | undefined;

  set WorkOrder(work: BaseWorkOrder|undefined){
    if(work) {
      this._work = work;
    }
  }

  get WorkOrder():BaseWorkOrder|undefined{
    return this._work
  }

  doWork():boolean{
    if(this._work){
      return this._work.doWork(this)
    }else{
      return true;
    }
  }

}
