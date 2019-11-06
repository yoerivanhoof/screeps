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

  public static spawnCreep(spawner: string, role: string) {

    if (role === 'guard') {
      Game.spawns[spawner].spawnCreep([ATTACK, ATTACK, TOUGH, TOUGH, MOVE], `${role} ${Game.time}`, {memory: {role}});
    } else {
      const result = Game.spawns[spawner].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE], `${role} ${Game.time}`, {memory: {role}});

      if (result === ERR_NOT_ENOUGH_ENERGY && role === 'harvester') { // make sure we can always spawn a harvester
        Game.spawns[spawner].spawnCreep([WORK, CARRY, MOVE], `${role} ${Game.time}`, {memory: {role}});
      }
    }
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
