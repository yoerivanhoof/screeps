export abstract class State<T> {
  public abstract enter(object: T): void;

  public abstract execute(object: T): void;

  public abstract exit(object: T): void;
}
