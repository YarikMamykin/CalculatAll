export class Observable<T> {
  private subscribers: Function[] = [];

  constructor(private _value: T) {}

  public set(newValue: T): void {
    this._value = newValue;
  }

  public get value(): T {
    return this._value;
  }

  public subscribe(subscriber: Function): void {
    this.subscribers.push(subscriber);
  }

  public notify(): void {
    this.subscribers.forEach((subscriber: Function) => subscriber(this.value));
  }
}
