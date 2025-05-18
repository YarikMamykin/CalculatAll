export class Observable<T> {
  private subscribers: Function[] = [];

  constructor(private _value: T) {}

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

  public subscribe(subscriber: Function): void {
    this.subscribers.push(subscriber);
  }
}
