import { ID } from "./id";

export class Observable<T> {
  private subscribers: Map<ID, Function>;

  constructor(private _value: T) {
    this.subscribers = new Map<ID, Function>();
  }

  public set(newValue: T): void {
    this._value = newValue;
    this.subscribers.forEach((subscriber: Function) => subscriber(newValue));
  }

  public get value(): T {
    return this._value;
  }

  public get type(): string {
    return typeof this._value;
  }

  public subscribe(subscriber: Function, subscriberId?: ID): ID {
    const id = subscriberId ?? new ID();
    this.subscribers.set(id, subscriber);
    return id;
  }

  public unsubscribe(subscriberId?: ID | undefined): void {
    if (!subscriberId) {
      this.subscribers.clear();
    }

    this.subscribers.delete(subscriberId as ID);
  }
}
