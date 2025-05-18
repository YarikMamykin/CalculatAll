import { describe, expect, test, jest } from "@jest/globals";
import { TestWidget } from "./utils/test_widget";

describe("Widget", () => {
  test("Calculate on input changed", () => {
    const widget = new TestWidget();
    const mockOutputSubscriber = jest.fn();

    widget.output.subscribe(mockOutputSubscriber);
    expect(mockOutputSubscriber).toHaveBeenCalledTimes(0);

    widget.userInput.set(20);
    expect(mockOutputSubscriber).toHaveBeenCalledWith(40);

    widget.userInput.set(30);
    expect(mockOutputSubscriber).toHaveBeenCalledWith(60);

    widget.programmableInput.set(40);
    expect(mockOutputSubscriber).toHaveBeenCalledWith(120);

    widget.programmableInput.set(50);
    expect(mockOutputSubscriber).toHaveBeenCalledWith(150);

    expect(mockOutputSubscriber).toHaveBeenCalledTimes(4);
  });
});
