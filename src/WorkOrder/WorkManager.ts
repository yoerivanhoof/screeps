import {BaseWorkOrder} from "./BaseWorkOrder";
import {BaseCreep} from "../Creep/Types/BaseCreep";

export class WorkManager {
  private _workList: BaseWorkOrder[] = [];

  public getWork(creep: BaseCreep):BaseWorkOrder|void{
    const work = _.filter(this._workList, (workOrder)=>!workOrder.done && !workOrder.inProgress && workOrder.maxWorkers > workOrder.CurrentWorkers());
    if(work.length > 0){
      work[0].registerWorker(creep);
      return work[0];
    }else {
      return;
    }
  }
}
