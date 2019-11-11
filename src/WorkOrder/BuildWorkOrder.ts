import {BaseWorkOrder} from "./BaseWorkOrder";
import {BaseCreep} from "../Creep/Types/BaseCreep";

export class BuildWorkOrder extends BaseWorkOrder{
  private site: ConstructionSite;
  constructor( site: ConstructionSite, name: string = `Build ${site.pos}`, maxWorkers: number = 1){
    super(name, maxWorkers);
    this.site = site;
  }
  protected work(creep: BaseCreep): boolean {
    if(creep.creep.carry.energy === 0){

    }else{
      const result = creep.creep.build(this.site);
      switch (result) {
        case OK:
          return this.site.progress == this.site.progressTotal;
        case ERR_NOT_IN_RANGE:
          creep.creep.moveTo(this.site);
        case ERR_NOT_OWNER:
        case ERR_INVALID_TARGET:
          console.log(`Creep: ${creep.creep.name} can't do workorder ${this.name}`);
          console.log(this);
          return true;
        default:
          return false;
      }
    }
    return false;
  }

}
