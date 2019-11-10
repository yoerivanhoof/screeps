export class Spawn {
  constructor(name: string) {
    this._spawn = name;
  }

  private _spawn: string;

  get spawn():StructureSpawn {
    return Game.spawns[this._spawn];
  }

  public work(): void {
    // todo
  };
}
