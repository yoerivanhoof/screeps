// example declaration file - remove these and add your own custom typings

// memory extension samples
/*
interface CreepMemory {
  role: string;
  room: string;
  working: boolean;
}

interface Memory {
  uuid: number;
  log: any;
}
*/

interface CreepMemory {
  role: string;
  room: string;
  state?: string;
  sourceId?: string;
}

interface FlagMemory {
  [name: string]: any
}

interface SpawnMemory {
  [name: string]: any
}

interface RoomMemory {
  role: string;
  state?: string;
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}
