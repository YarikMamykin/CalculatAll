import { Widget } from "../widget";
import { Observable } from "../observable";
import { describe, expect, test, jest } from "@jest/globals";
import { defineComponent } from "vue";
import { WidgetSettings } from "../widget_settings";

type UserInput = number;
type ProgrammableInput = Number;
type Output = number;

class TestWidgetSettings extends WidgetSettings {
  constructor() {
    super("Test");
  }
}

class TestWidget extends Widget {
  constructor() {
    super(
      defineComponent({
        name: "MockComponent",
        template: "<div>Mock Component</div>",
      }),
      new Observable<UserInput>(0),
      new Observable<ProgrammableInput>(0),
      new Observable<Output>(0),
      new TestWidgetSettings(),
    );
  }

  protected override _calculate(input: UserInput): Output {
    return input * 2;
  }
}

describe("Widget", () => {
  test("Calculate on input changed", () => {
    const widget = new TestWidget();
    const mockOutputSubscriber = jest.fn();

    widget.output.subscribe(mockOutputSubscriber);
    expect(mockOutputSubscriber).toHaveBeenCalledTimes(0);

    widget.userInput.set(20);
    expect(mockOutputSubscriber).toHaveBeenCalledTimes(1);
    expect(mockOutputSubscriber).toHaveBeenCalledWith(40);

    widget.userInput.set(30);
    expect(mockOutputSubscriber).toHaveBeenCalledTimes(2);
    expect(mockOutputSubscriber).toHaveBeenCalledWith(60);
  });
});
