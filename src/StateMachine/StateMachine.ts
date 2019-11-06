import {State} from "./State";

export class StateMachine<T> {
  private _owner: T;
  private _previousState?: State<T>;
  private _currentState?: State<T>;

  public constructor(owner: T) {
    this._owner = owner;
  }

  private _globalState?: State<T>;

  set globalState(state: State<T>) {
    if (this._globalState) {
      this._globalState.exit(this._owner);
    }
    this._globalState = state;
    this._globalState.enter(this._owner);
  }

  get state(): State<T> | undefined {
    return this._currentState;
  }

  set state(state: State<T> | undefined) {
    if (state) {
      if (this._currentState) {
        this._currentState.exit(this._owner);
        this._previousState = this._currentState;
      }
      this._currentState = state;
      this._currentState.enter(this._owner);
    }
  }

  public revertToPreviousState() {
    if (this._previousState) {
      this.state = this._previousState;
    }
  }

  public execute() {
    if (this._globalState) {
      this._globalState.execute(this._owner)
    }

    if(this._currentState){
      this._currentState.execute(this._owner);
    }
  }


}
