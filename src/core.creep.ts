export class CoreCreep {
  public static findClosesSource(objects: Source[], pos: RoomPosition) {
    const positions = [];
    for (let index = 0; index < objects.length; index++) {
      positions.push(objects[index].pos);
    }
    return this.findClosest(pos, positions);
  }
  public static findClosestBuild(objects: Array<ConstructionSite<BuildableStructureConstant>>, pos: RoomPosition) {
    const positions = [];
    for (let index = 0; index < objects.length; index++) {
      positions.push(objects[index].pos);
    }
    return this.findClosest(pos, positions);
  }
  public static spawnCreep(spawner: string, role: string) {
    // @ts-ignore
    const result = Game.spawns[spawner].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE], `${role} ${Game.time}`, { memory: { role } });

    if(result === ERR_NOT_ENOUGH_ENERGY && role === 'harvester'){ // make sure we can always spawn a harvester
      // @ts-ignore
      Game.spawns[spawner].spawnCreep([WORK, CARRY, MOVE], `${role} ${Game.time}`, { memory: { role } });
    }
  }
  private static findClosest(source: RoomPosition, target:RoomPosition[]) {
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
