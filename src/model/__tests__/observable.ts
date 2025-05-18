import { Observable } from "../observable";
import { describe, expect, jest, test } from "@jest/globals";
import { ID } from "../id";

describe("Observable", () => {
  test("Set", () => {
    const initialValue = "test string";
    const o = new Observable<String>(initialValue);

    const mockSubscriber = jest.fn();
    o.subscribe(mockSubscriber);

    expect(o.value).toBe(initialValue);
    expect(mockSubscriber).toHaveBeenCalledTimes(0);

    const newValue = "new value";
    o.set(newValue);

    expect(mockSubscriber).toHaveBeenCalledTimes(1);
    expect(mockSubscriber.mock.calls.at(0)?.at(0)).toBe(newValue);
  });

  test("Set with predefined ID", () => {
    const initialValue = "test string";
    const o = new Observable<String>(initialValue);

    const mockSubscriber = jest.fn();
    o.subscribe(mockSubscriber, new ID());

    expect(o.value).toBe(initialValue);
    expect(mockSubscriber).toHaveBeenCalledTimes(0);

    const newValue = "new value";
    o.set(newValue);

    expect(mockSubscriber).toHaveBeenCalledTimes(1);
    expect(mockSubscriber.mock.calls.at(0)?.at(0)).toBe(newValue);
  });

  test("Get", () => {
    const initialValue = "test string";
    const o = new Observable<String>(initialValue);

    expect(o.value).toBe(initialValue);

    const newValue = "new value";
    o.set(newValue);

    expect(o.value).toBe(newValue);
  });

  test("Unsubscribe", () => {
    const initialValue = "test string";
    const o = new Observable<String>(initialValue);
    const id = new ID();
    const wrongId = new ID();

    expect(id).not.toEqual(wrongId);

    const mockSubscriber = jest.fn();
    o.subscribe(mockSubscriber, id);

    const newValue = "new value";
    o.set(newValue);

    expect(mockSubscriber).toHaveBeenCalledTimes(1);
    expect(mockSubscriber.mock.calls.at(0)?.at(0)).toBe(newValue);

    o.unsubscribe(wrongId); // Does nothing
    o.set(initialValue);
    expect(mockSubscriber).toHaveBeenCalledTimes(2); // called second time
    expect(mockSubscriber.mock.calls.at(1)?.at(0)).toBe(initialValue);

    o.unsubscribe(id);
    o.set(newValue);
    expect(mockSubscriber).toHaveBeenCalledTimes(2); // not called one more time
  });
});
