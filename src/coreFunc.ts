export class CoreFunc {

  public static findClosesSource(objects: Source[], pos: RoomPosition) {
    return this.findClosest(pos, objects.map(obj => {
      return obj.pos;
    }));
  }

  public static findClosestBuild(objects: Array<ConstructionSite<BuildableStructureConstant>>, pos: RoomPosition) {
    return this.findClosest(pos, objects.map(obj => {
      return obj.pos;
    }));
  }

  public static findClosestRepair(objects: AnyStructure[], pos: RoomPosition) {
    return this.findClosest(pos, objects.map(obj => {
      return obj.pos;
    }));
  }

  public static findClosestEnemy(objects: Creep[], pos: RoomPosition) {
    return this.findClosest(pos, objects.map(obj => {
      return obj.pos;
    }));
  }


  private static findClosest(source: RoomPosition, target: RoomPosition[]) {
    let min = 5000000;
    let minIndex = -1;
    for (let index = 0; index < target.length; index++) {
      const path = PathFinder.search(source, target[index]);
      if (path.cost < min) {
        min = path.cost;
        minIndex = index;
      }
    }
    return minIndex;
  }
}
