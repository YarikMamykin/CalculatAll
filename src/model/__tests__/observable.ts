import { Observable } from "../observable";
import { describe, expect, jest, test } from "@jest/globals";

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

  test("Get", () => {
    const initialValue = "test string";
    const o = new Observable<String>(initialValue);

    expect(o.value).toBe(initialValue);

    const newValue = "new value";
    o.set(newValue);

    expect(o.value).toBe(newValue);
  });
});
