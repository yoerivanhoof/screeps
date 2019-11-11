import {BaseCreep} from "../Creep/Types/BaseCreep";

export abstract class BaseWorkOrder {
  public done: boolean = false;
  public inProgress: boolean = false;
  public maxWorkers: number = 1;
  public name: string;
  private _currentWorkers: { [name: string]: BaseCreep } = {};

  protected constructor(name: string, maxWorkers: number = 1) {
    this.name = name;
    this.maxWorkers = maxWorkers
  }

  registerWorker(creep: BaseCreep) {
    this._currentWorkers[creep.creep.name] = creep;
  }

  public CurrentWorkers(): number {
    for (let currentWorkersKey in this._currentWorkers) {
      if (!this._currentWorkers[currentWorkersKey]) {
        delete this._currentWorkers[currentWorkersKey];
      }
    }
    return Object.keys(this._currentWorkers).length;
  }

  public doWork(creep: BaseCreep): boolean {
    if (!this.done) {
      this.done = this.work(creep);
      return this.done;
    } else {
      return true;
    }
  }

  protected abstract work(creep: BaseCreep): boolean;
}
