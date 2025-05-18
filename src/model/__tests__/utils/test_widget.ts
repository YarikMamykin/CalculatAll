import { Widget } from "../../widget";
import { Observable } from "../../observable";
import { WidgetSettings } from "../../widget_settings";
import { defineComponent } from "vue";

type UserInput = number;
type ProgrammableInput = number;
type Output = number;

export class TestWidgetSettings extends WidgetSettings {
  constructor() {
    super("Test");
  }
}

export class TestWidget extends Widget {
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

  protected override _calculateProgrammable(input: ProgrammableInput): Output {
    return input * 3;
  }
}
