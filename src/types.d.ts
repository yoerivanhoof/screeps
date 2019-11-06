// example declaration file - remove these and add your own custom typings

// memory extension samples

interface CreepMemory {
  role: string;
  room: string;
  state: string;
  sourceId: string;
  targetX: number;
  targetY: number;
}

interface Memory {
  uuid: number;
  log: any;
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}
